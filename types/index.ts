export interface RankingEntry {
  email: string;
  first: string;
  last: string;
  location: string;
  total: number;
  referrals: number;
}

export interface RankingApiResponse {
  entries: RankingEntry[];
  total: number;
  updatedAt: string;
}
