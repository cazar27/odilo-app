import { Component, Input, OnInit } from '@angular/core';
import { GitHubUser } from 'src/app/interfaces/githubuser.interface';
import { GithubService } from 'src/app/services/github.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { forkJoin, of, switchMap, throwError } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: GitHubUser[] = [];
  invalidNext: boolean = false;
  invalidPrev: boolean = true;
  isLoader: boolean = false;
  error:boolean = false;
  // TODO: remove here to add nex and prev in service
  currentPage: number = 1;
  totalItems: number = 0;
  numItems: number = 10;
  @Input() username: string = '';

  constructor(
    private githubService: GithubService,
    private userDataService: UserDataService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.users = [];
    this.currentPage = 1;

    this.userDataService.getUsername().subscribe(username => {
      this.username = username;
      this.loadUsers();
    });
  }

  ngOnDestroy() {
    this.resetState();
  }

  private resetState() {
    this.users = [];
    this.currentPage = 1;
  }

  private loadUsers(): void {
    this.alertService.clear();
    this.users = [];
    this.isLoader = true;

    if (this.username && this.username.length >= 4 && this.username.toLowerCase() !== 'gcpglobal') {
      this.githubService.getInfoUsers(this.username,1)
      .subscribe(data => {
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
    //   this.githubService.getUsers(this.username, this.currentPage)
    //     .pipe(
    //       catchError(error => {
    //         this.error = true;
    //         this.isLoader = false;
    //         this.alertService.error(error.error.message);
    //         return throwError(error);
    //       }),
    //       switchMap(data => {
    //         if (data.items.length > 0) {
    //           this.totalItems = data.total_count;
    //           this.users = data.items;
    //           const followersRequests = this.users.map(user => {
    //             return this.githubService.getByUrl(user.followers_url).pipe(
    //               catchError(error => {
    //                 this.error = true;
    //                 this.isLoader = false;
    //                 this.alertService.error(error.error.message);
    //                 return of([]);
    //               })
    //             );
    //           });
    //           return forkJoin(followersRequests);
    //         } else {
    //           this.isLoader = false;
    //           return of([]);
    //         }
    //       })
    //     )
    //     .subscribe(followersArray => {
    //       this.isLoader = false;
    //       this.users.forEach((user, index) => {
    //         user.followers = followersArray[index];
    //       });
    //     });
    // } else {
    //   this.users = [];
    //   this.isLoader = false;
    // }
  }

  goToUserDetails(param: string): void {
    this.router.navigate(['home/user', param]);
  }

  nextPage(): void {
    if (this.totalItems / this.numItems >= this.currentPage) {
      this.currentPage++;
      this.loadUsers();
      this.invalidPrev = false;
    }
    if (this.totalItems / this.numItems < this.currentPage) {
      this.invalidNext = true;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }
}
