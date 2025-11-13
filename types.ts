export interface BoardMember {
  name: string;
  title: string;
  image_url: string;
  linkedin_url: string;
  bio: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  linkedin_url: string;
  overall_rank: string;
  overall_points: string;
  overall_change: string;
  weekly_rank: string;
  weekly_points: string;
  weekly_change: string;
}
