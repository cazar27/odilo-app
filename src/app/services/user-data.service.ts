import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserDataService {
  private _usernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  setUsername(username: string): void {
    this._usernameSubject.next(username);
  }

  getUsername(): Observable<string> {
    return this._usernameSubject.asObservable();
  }
}
