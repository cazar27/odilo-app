import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setTheme(theme: boolean): void {
    this.themeSubject.next(theme);
  }

  getTheme(): Observable<boolean> {
    return this.themeSubject.asObservable();
  }
}
