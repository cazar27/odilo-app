export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  followers_url: string;
  followers?: GitHubUser[];
  repos_url: string;
  repositories?: any[];
  node_id?: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  site_admin?: boolean;
  score?: number;
}
