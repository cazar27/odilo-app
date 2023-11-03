import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'environments/environment';

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

  getUserScoreByLogin(login: string): boolean {
    this.getUserDetailsByLogin(login).pipe(
      catchError(error => {
        return throwError(error);
      })
    ).subscribe(data => {
      const user = data.items[0];
      return (user.score > 0);
    })
    return false;
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
