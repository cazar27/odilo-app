import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map, forkJoin, mergeMap } from 'rxjs';

import { GitHubUser } from '../interfaces/githubuser.interface';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private apiUrl = 'https://api.github.com/search/users';

  constructor(private http: HttpClient) { }

  getUserDetailsByLogin(login: string): Observable<any> { 
    const url = `${this.apiUrl}?q=${login}`;
    return this.http.get(url);
  }

  getUserScoreByLogin(login: string): Observable<boolean> {
    return this.getUserDetailsByLogin(login).pipe(
      map(data => {
        const user = data.items[0]; // probablemente cambiar mas adelante por getInfoUser quitar item[0] 
        return user.score > 20;
      }),
       catchError(error => {
        console.error('Error al obtener detalles del usuario:', error);
        return throwError(error);
      })
    );
  }
  
  getInfoUser(login: string): Observable<GitHubUser> {
    const url = `${this.apiUrl}?q=${login}`;
    return this.http.get<any>(url).pipe(
      map(response => {
        if (response.total_count === 0) {
          throw new Error('Usuario no encontrado');
        }
        const user = response.items[0] as GitHubUser;
        const followersUrl = user.followers_url.replace('{/other_user}', '');
        const reposUrl = user.repos_url;
        const followersRequest = this.http.get<any>(followersUrl).pipe();
        const reposRequest = this.http.get<any>(reposUrl).pipe();

        return forkJoin([followersRequest, reposRequest]).pipe(
          map(([followers, repositories]) => {
            user.followers = followers;
            user.repositories = repositories;
            return user;
          }),
        );
      })
    );
  }

  getInfoUsers(username: string, page: number): Observable<GitHubUser[]> {
    const perPage = 10;
    const url = `${this.apiUrl}?q=${username}&page=${page}&per_page=${perPage}`;

    return this.http.get<any>(url).pipe(
      mergeMap(response => {
        if (response.total_count === 0) {
          throw new Error('Usuario no encontrado');
        }

        const users: GitHubUser[] = response.items;
        const requests: Observable<any>[] = [];

        users.forEach(user => {
          const followersUrl = user.followers_url.replace('{/other_user}', '');
          const reposUrl = user.repos_url;

          const followersRequest = this.http.get<any>(followersUrl);
          const reposRequest = this.http.get<any>(reposUrl);

          const userRequest = forkJoin([followersRequest, reposRequest]).pipe(
            map(([followers, repositories]) => {
              user.followers = followers;
              user.repositories = repositories;
              return user;
            })
          );

          requests.push(userRequest);
        });

        return forkJoin(requests);
      })
    );
  }


  getUsers(username: string, page: number): Observable<any> {
    const perPage = 10;
    const url = `${this.apiUrl}?q=${username}&page=${page}&per_page=${perPage}`;
    return this.http.get(url);
  }

  getByUrl(userFwUrl: string): Observable<any> {
    const url = `${userFwUrl}`;
    return this.http.get(url);
  }

}
