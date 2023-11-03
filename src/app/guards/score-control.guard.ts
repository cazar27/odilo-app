import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GithubService } from '../services/github.service';

export const scoreControlGuard: CanActivateFn = (route, state) => {
  const githubService = inject(GithubService);
  const router = inject(Router);
  const login = route.params['login'];
  if(githubService.getUserScoreByLogin(login)) {
    return githubService.getUserScoreByLogin(login);
  } else {
    router.navigate(['/home/list']);
    return githubService.getUserScoreByLogin(login);
  }
};
