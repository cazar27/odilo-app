import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map, forkJoin, mergeMap } from 'rxjs';

import { GitHubUser } from '../interfaces/githubuser.interface';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private apiUrl = 'https://api.github.com/search/users';

  constructor(
    private http: HttpClient
  ) { }

  getUserDetailsByLogin(login: string): Observable<any> {
    const url = `${this.apiUrl}?q=${login}`;
    return this.http.get(url);
  }


  getUserDetailsInfoByLogin(login: string): Observable<GitHubUser[]> {
    return this.getUserDetailsByLogin(login).pipe(
      mergeMap(response => {
        if (response.total_count === 0) {
          // acfredeee ejemplo
          const error = new Error('User not found');
          return throwError(() => error);
        }

        const users: GitHubUser[] = response.items;
        const requests: Observable<GitHubUser>[] = [];

        users.forEach(user => {
          const userRequest = this.getUserDetails(user);
          requests.push(userRequest);
        });

        return forkJoin(requests);
      })
    );
  }

  getUserScoreByLogin(login: string): Observable<boolean> {
    return this.getUserDetailsInfoByLogin(login).pipe(
      map(data => {
        const user = data[0];
        return user.score?user.score > 20:false;
      }),
       catchError(error => {
        console.error('Error:', error);
        return throwError(() => error);
      })
    );
  }

  private getUserDetails(user: GitHubUser): Observable<GitHubUser> {
    const followersUrl = user.followers_url;
    const reposUrl = user.repos_url;

    const followersRequest = this.getByUrl(followersUrl);
    const reposRequest = this.getByUrl(reposUrl);

    return forkJoin([followersRequest, reposRequest]).pipe(
      map(([followers, repositories]) => {
        user.followers = followers;
        user.repositories = repositories;
        return user;
      })
    );
  }

  getInfoUsers(username: string): Observable<GitHubUser[]> {

    return this.getUsers(username).pipe(
      mergeMap(response => {
        if (response.total_count === 0) {
          // acfredeee ejemplo
          const error = new Error('User not found');
          return throwError(() => error);
        }

        const users: GitHubUser[] = response.items;
        const requests: Observable<any>[] = [];

        users.forEach(user => {
          const userRequest = this.getUserDetails(user);
          requests.push(userRequest);
        });

        return forkJoin(requests);
      })
    );
  }

  getUsers(username: string): Observable<any> {
    const perPage = 10;
    const page = 1;
    const url = `${this.apiUrl}?q=${username}&page=${page}&per_page=${perPage}`;
    return this.http.get(url);
  }

  getByUrl(userFwUrl: string): Observable<any> {
    const url = `${userFwUrl}`;
    return this.http.get(url);
  }

}
