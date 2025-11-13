import requests
import json
import datetime
import pandas as pd
#from cookies import cookies
import os

cookies_env = os.getenv('LEETCODE_COOKIES')
    
if isinstance(cookies_env, str):
    try:
        cookies = json.loads(cookies_env)
    except json.JSONDecodeError:
        cookies = {}
else:
    cookies = cookies_env or {}

# Ensure all cookie values are strings
cookies = {k: str(v) for k, v in cookies.items()}

headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Connection': 'keep-alive',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:123.0) Gecko/20100101 Firefox/123.0'
}

def get_recent_ac_submissions(username, limit=20):
    """
    Fetches recent ACCEPTED submissions using the 'recentAcSubmissionList' query.
    """
    url = "https://leetcode.com/graphql"
    
    # This payload matches your desired output
    payload = {
        "operationName": "recentAcSubmissionList",
        "query": """
         query recentAcSubmissionList($username: String!, $limit: Int!) {
            recentAcSubmissionList(username: $username, limit: $limit) {
                titleSlug
                timestamp
                lang
                statusDisplay
                runtime
                memory
            }
        }
        """,
        "variables": {
            "username": username,
            "limit": limit
        }
    }
    
    response = requests.post(url, headers=headers, cookies=cookies, json=payload)
    
    if response.status_code == 200:
        data = response.json()
        # Check for the expected key
        if 'data' in data and 'recentAcSubmissionList' in data['data']:
            return data['data']['recentAcSubmissionList']
        else:
            print(f"Error: Unexpected response format. {data}")
            return None
    else:
        print(f'Failed to retrieve submissions for {username}, response status code: {response.status_code}')
        return None


def get_user_stat(username):

    url = "https://leetcode.com/graphql"

    payload = {
                "operationName": "userPublicProfile",
                "query": """
                    query userPublicProfile($username: String!) {
                        matchedUser(username: $username) {
                            username
                            profile {
                                ranking
                            }
                            submitStats: submitStatsGlobal {
                                acSubmissionNum {
                                    difficulty
                                    count
                                    submissions
                                }
                            }
                        }
                    }
                """,
                "variables": {
                    "username": username
                }
            }

    response = requests.post(url, headers=headers, cookies=cookies, json=payload)
    
    if response.status_code == 200:
        data = response.json()
        # Check for the expected key
        if 'data' in data and 'matchedUser' in data['data'] and 'profile' in data['data']['matchedUser'] and 'ranking' in data['data']['matchedUser']['profile']:
            return data['data']['matchedUser']['profile']['ranking']
        else:
            print(f"Error: Unexpected response format. {data}")
            return None
    else:
        print(f'Failed to retrieve submissions for {username}, response status code: {response.status_code}')
        return None

def main():

    UNITS = "BKMGTP"

    df_user = pd.read_csv('public/data/usernames.csv')
    usernames = df_user['id'].tolist()

    df_all = pd.read_csv('public/data/recent_ac_submissions.csv') if pd.io.common.file_exists('public/data/recent_ac_submissions.csv') else pd.DataFrame()
    df_rank_old = pd.read_csv('public/data/leetcode_leaderboard.csv') if pd.io.common.file_exists('public/data/leetcode_leaderboard.csv') else pd.DataFrame()
    df_rank_old = df_rank_old[['id', 'weekly_points','overall_points']].rename(columns={'weekly_points': 'weekly_points_old', 'overall_points': 'overall_points_old'})

    df_overall_rank_new = pd.DataFrame(['id', 'overall_points'])
    overall_points = []

    for username in usernames:
        recent_subs = get_recent_ac_submissions(username)
        df = pd.DataFrame(recent_subs)
        print(f"Fetched {len(df)} recent submissions for user: {username}")
        df['id'] = username
        df_all = pd.concat([df_all, df], ignore_index=True)

        overall_points.append(get_user_stat(username))
    
    df_overall_rank_new = pd.DataFrame({'id': usernames, 'overall_points': overall_points})
    df_all['runtime_val'] = df_all['runtime'].apply(lambda x: int(x.split()[0].rstrip(UNITS)))
    df_all['memory_val'] = df_all['memory'].apply(lambda x: float(x.split()[0].rstrip(UNITS)))
    df_all.sort_values(by=['id', 'titleSlug', 'runtime_val', 'memory_val'], ascending=[True, True , True, True], inplace=True)
    df_all = df_all.drop_duplicates(subset=['id', 'titleSlug'], keep='first')


    ### The below block calculates the weekly points - need to change it appropriately
    ##################################

    df_all['weekly_points'] = df_all['runtime_val'] + df_all['memory_val']

    ##################################

    df_rank_new = df_all.groupby('id')['weekly_points'].sum().reset_index().sort_values(by='weekly_points')

    # filtering only for the usernames in the list and retaining the old user's data in recent_ac_submissions.csv
    df_rank_new = df_rank_new[df_rank_new['id'].isin(usernames)] 

    df_rank_new.reset_index(drop=True, inplace=True)
    df_rank_new['weekly_rank'] = df_rank_new.index + 1
    df_rank_new = df_rank_new[['weekly_rank', 'id', 'weekly_points']]
    df_rank_new.sort_values(by = 'weekly_rank', ascending=True, inplace=True)

    df_merged_points = df_rank_new.merge(df_rank_old, on='id', how='left')
    df_merged_points['weekly_change'] = (df_merged_points['weekly_points'] - df_merged_points['weekly_points_old']).fillna(0).astype(int)

    df_result = df_merged_points[['weekly_rank', 'id', 'weekly_points', 'weekly_change']]
    df_result = df_result.merge(df_user, on='id', how='left')



    ## getting user stats for each user
    df_overall_rank_new = df_overall_rank_new.merge(df_rank_old, on='id', how='left')
    df_result = df_result.merge(df_overall_rank_new, on='id', how='left')
    df_result['overall_rank'] = df_result['overall_points'].rank(method='min').astype(int)

    df_result['overall_change'] = (df_result['overall_points'] - df_result['overall_points_old']).fillna(0).astype(int)

    df_result = df_result[['overall_rank', 'weekly_rank', 'id', 'weekly_points', 'weekly_change', 'overall_points', 'overall_change', 'name', 'linkedin_url']]  

    print(df_result)

    df_all.to_csv('public/data/recent_ac_submissions.csv', index=False)
    df_result.to_csv('public/data/leetcode_leaderboard.csv', index=False)

    print("Successfully scraped and saved data!")

if __name__ == "__main__":
    main()
