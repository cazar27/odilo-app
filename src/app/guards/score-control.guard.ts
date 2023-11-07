import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GithubService } from '../services/github.service';
import { catchError, map, of } from 'rxjs';
import { AlertService } from '../services/alert.service';

export const scoreControlGuard: CanActivateFn = (route, state) => {
  const githubService = inject(GithubService);
  const alerService = inject(AlertService);
  const router = inject(Router);
  const login = route.params['login'];
  return githubService.getUserScoreByLogin(login).pipe(
    map(data => {
      if (data) {
        return true;
      } else {
        router.navigate(['/home']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/home']);
      alerService.error('Faild User Call')
      return of(false);
    })
  );
};
