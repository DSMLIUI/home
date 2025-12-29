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
    df_rank_old = df_rank_old[['id', 'weekly_problems_solved','overall_problems_solved', 'global_leetcode_rank']].rename(columns={'weekly_problems_solved': 'weekly_problems_solved_old', 'overall_problems_solved': 'overall_problems_solved_old', 'global_leetcode_rank': 'global_leetcode_rank_old'}) if not df_rank_old.empty else pd.DataFrame()

    global_leetcode_rank = []

    for username in usernames:
        recent_subs = get_recent_ac_submissions(username)
        df = pd.DataFrame(recent_subs)
        print(f"Fetched {len(df)} recent submissions for user: {username}")
        df['id'] = username
        df_all = pd.concat([df_all, df], ignore_index=True)

        global_leetcode_rank.append(get_user_stat(username))
    
    # Handle mixed timestamp formats (Unix epoch numbers and datetime strings)
    df_all['timestamp'] = df_all['timestamp'].apply(
        lambda x: pd.to_datetime(x, unit='s') if str(x).isdigit() else pd.to_datetime(x)
    )
    
    df_all.sort_values(by=['id', 'titleSlug'], ascending=[True, True], inplace=True)
    df_all = df_all.drop_duplicates(subset=['id', 'titleSlug'], keep='first')

    # Load the challenge schedule
    df_challenge = pd.read_csv('public/data/leetcode_challenge.csv')
    df_challenge['Date'] = pd.to_datetime(df_challenge['Date'], format='%d/%m/%y')
    
    # Calculate current week number based on challenge start date
    challenge_start_date = df_challenge['Date'].min()
    current_date = datetime.datetime.now()
    days_since_start = (current_date - challenge_start_date).days
    current_week = (days_since_start // 7) + 1

    ### STEP 1: Calculate overall problems solved and overall rank
    ##################################
    
    # Get all problems from week 1 to current week (all problems in syllabus so far)
    overall_problems = df_challenge[df_challenge['Week'] <= current_week]['problem_name'].tolist()
    
    # Filter submissions to only include problems from the syllabus
    df_overall = df_all[df_all['titleSlug'].isin(overall_problems)].copy()
    
    # Count number of overall problems solved per user
    df_overall_count = df_overall.groupby('id').size().reset_index(name='overall_problems_solved')
    
    # Create a dataframe with all users (including those with 0 problems solved)
    df_result = pd.DataFrame({'id': usernames})
    df_result = df_result.merge(df_overall_count, on='id', how='left')
    df_result['overall_problems_solved'] = df_result['overall_problems_solved'].fillna(0).astype(int)
    
    # Add global LeetCode ranking
    df_result['global_leetcode_rank'] = global_leetcode_rank
    
    # Merge with user info and old data
    df_result = df_result.merge(df_user, on='id', how='left')
    df_result = df_result.merge(df_rank_old, on='id', how='left')
    
    # Calculate overall_rank with tie-breaking: overall_problems_solved (desc) > global_leetcode_rank (asc)
    df_result = df_result.sort_values(by=['overall_problems_solved', 'global_leetcode_rank'], ascending=[False, True]).reset_index(drop=True)
    df_result['overall_rank'] = range(1, len(df_result) + 1)
    
    # Calculate overall_rank_change
    df_result['overall_rank_change'] = (df_result['overall_problems_solved_old'] - df_result['overall_problems_solved']).fillna(0).astype(int)

    ##################################

    ### STEP 2: Calculate weekly problems solved and weekly rank
    ##################################
    
    # Get problems for current week
    weekly_problems = df_challenge[df_challenge['Week'] == current_week]['problem_name'].tolist()
    
    # Calculate one week ago from now
    one_week_ago = current_date - datetime.timedelta(days=7)
    
    # Filter submissions to only include current week's problems solved within the last week
    df_weekly = df_all[
        (df_all['titleSlug'].isin(weekly_problems)) & 
        (df_all['timestamp'] >= one_week_ago)
    ].copy()
    
    # Count number of weekly problems solved per user
    df_weekly_count = df_weekly.groupby('id').size().reset_index(name='weekly_problems_solved')
    
    # Merge weekly data
    df_result = df_result.merge(df_weekly_count, on='id', how='left')
    df_result['weekly_problems_solved'] = df_result['weekly_problems_solved'].fillna(0).astype(int)
    
    # Calculate weekly_rank with tie-breaking: weekly_problems_solved (desc) > overall_rank (asc) > global_leetcode_rank (asc)
    df_result = df_result.sort_values(by=['weekly_problems_solved', 'overall_rank', 'global_leetcode_rank'], ascending=[False, True, True]).reset_index(drop=True)
    df_result['weekly_rank'] = range(1, len(df_result) + 1)
    
    # Calculate weekly_rank_change
    df_result['weekly_rank_change'] = (df_result['weekly_problems_solved_old'] - df_result['weekly_problems_solved']).fillna(0).astype(int)

    ##################################
    
    # Set global_rank same as overall_rank and calculate global_change
    df_result['global_rank'] = df_result['global_leetcode_rank'].rank(method='min').astype(int)
    df_result['global_change'] = (df_result['global_leetcode_rank_old'] - df_result['global_leetcode_rank']).fillna(0).astype(int)
    df_result = df_result[['name', 'id', 'global_rank', 'global_leetcode_rank', 'global_change', 'overall_rank', 'overall_problems_solved', 'overall_rank_change', 'weekly_rank', 'weekly_problems_solved', 'weekly_rank_change', 'linkedin_url']]  

    print(df_result)

    df_all.to_csv('public/data/recent_ac_submissions.csv', index=False)
    df_result.to_csv('public/data/leetcode_leaderboard.csv', index=False)

    print("Successfully scraped and saved data!")

if __name__ == "__main__":
    main()
