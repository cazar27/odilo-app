import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { GitHubUser } from 'src/app/interfaces/githubuser.interface';
import { AlertService } from 'src/app/services/alert.service';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  login: string = '';
  error: boolean = false;
  user!: GitHubUser;

  constructor(
    private route: ActivatedRoute,
    private githubService: GithubService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.login = params['login'];
      this.loadUserDetails(this.login);
    });
  }

  loadUserDetails(login: string = ''): void {
    this.githubService.getUserDetailsInfoByLogin(login).pipe(
      catchError(error => {
        console.error('Error: ', error);
        this.alertService.error(error.error.message);
        return throwError(() => error);
      })
    ).subscribe(data => {
      this.user = data[0];
    });
  }

  goToUserDetails(param: string): void {
    this.router.navigate(['home/user', param]);
  }
}
