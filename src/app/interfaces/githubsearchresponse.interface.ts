import { GitHubUser } from "./githubuser.interface";

export interface GitHubSearchResponse {
  total_count?: number;
  incomplete_results?: boolean;
  items?: GitHubUser[];
}
