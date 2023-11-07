import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, map, forkJoin, mergeMap, BehaviorSubject } from 'rxjs';

import { GitHubUser } from '../interfaces/githubuser.interface';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private _apiUrl = 'https://api.github.com/search/users';
  private _itemsPerPage = 10;
  private _totalItems = 10;

  private _currentPageSubject = new BehaviorSubject<number>(1);
  private _prevButtonDisabledSubject = new BehaviorSubject<boolean>(true);
  private _nextButtonDisabledSubject = new BehaviorSubject<boolean>(false);

  currentPage$ = this._currentPageSubject.asObservable();
  prevButtonDisabled$ = this._prevButtonDisabledSubject.asObservable();
  nextButtonDisabled$ = this._nextButtonDisabledSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  get currentPage(): number {
    return this._currentPageSubject.value;
  }

  set currentPage(value: number) {
    this._currentPageSubject.next(value);
  }

  getUserDetailsByLogin(login: string): Observable<any> {
    const url = `${this._apiUrl}?q=${login}`;
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
    const response = this.getUsers(username, this._currentPageSubject.value).pipe(
      mergeMap(response => {
        if (response.total_count === 0) {
          const error = new Error('User not found');
          return throwError(() => error);
        }
        this._totalItems = response.total_count;
        const users: GitHubUser[] = response.items;
        const requests: Observable<any>[] = [];

        users.forEach(user => {
          const userRequest = this.getUserDetails(user);
          requests.push(userRequest);
        });
        return forkJoin(requests);
      })
    );
    this.updateButtonStates();
    return response;
  }

  getUsers(username: string, page: any): Observable<any> {
    const perPage = this._itemsPerPage;
    const url = `${this._apiUrl}?q=${username}&page=${page}&per_page=${perPage}`;
    return this.http.get(url);
  }

  getByUrl(userFwUrl: string): Observable<any> {
    const url = `${userFwUrl}`;
    return this.http.get(url);
  }


  next(): void {
    const currentPage = this._currentPageSubject.value;
    if (currentPage < this.calculateTotalPages()) {
      this._currentPageSubject.next(currentPage + 1);
    }
    this.updateButtonStates();
  }

  prev(): void {
    const currentPage = this._currentPageSubject.value;
    if (currentPage > 1) {
      this._currentPageSubject.next(currentPage - 1);
    }
    this.updateButtonStates();
  }

  private updateButtonStates(): void {
    const currentPage = this._currentPageSubject.value;
    const totalPages = this.calculateTotalPages();

    this._prevButtonDisabledSubject.next(currentPage <= 1);
    this._nextButtonDisabledSubject.next(currentPage >= totalPages);
  }


  private calculateTotalPages(): number {
    const totalItems = this._totalItems;
    const itemsPerPage = this._itemsPerPage;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return totalPages;
  }

}
