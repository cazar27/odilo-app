import { Component, Input, OnInit } from '@angular/core';
import { GitHubUser } from 'src/app/interfaces/githubuser.interface';
import { GithubService } from 'src/app/services/github.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: GitHubUser[] = [];
  invalidNext = this.githubService.nextButtonDisabled$;
  invalidPrev = this.githubService.prevButtonDisabled$
  isLoader: boolean = false;
  error: boolean = false;

  @Input() username: string = '';

  constructor(
    private githubService: GithubService,
    private userDataService: UserDataService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.users = [];

    this.userDataService.getUsername().subscribe(username => {
      this.username = username;
      this.githubService.currentPage = 1;
      this.loadUsers();
    });

    this.githubService.currentPage$.subscribe(() => {
      this.loadUsers();
    });
  }

  ngOnDestroy() {
    this.resetState();
  }

  private resetState() {
    this.users = [];
  }

  private loadUsers(): void {
    this.alertService.clear();
    this.users = [];
    this.isLoader = true;

    if (this.username && this.username.length >= 4 && this.username.toLowerCase() !== 'gcpglobal') {
      this.githubService.getInfoUsers(this.username)
        .pipe(
          catchError(error => {
            this.error = true;
            this.isLoader = false;
            this.users = [];
            console.error('Error: ', error);
            if (error.message === 'User not found')
              this.alertService.warn(`List ${error}`)
            else
              this.alertService.error(`List ${error.error.message}`)
            return throwError(() => error);
          })
        ).subscribe(data => {
          if (data.length > 0) {
            this.users = data;
            this.isLoader = false;
            this.error = false;
          }
        })
    } else {
      this.users = [];
      this.isLoader = false;
    }
  }

  goToUserDetails(param: string): void {
    this.router.navigate(['home/user', param]);
  }

  nextPage(): void {
    this.githubService.next();
  }

  prevPage(): void {
    this.githubService.prev();
  }
}
