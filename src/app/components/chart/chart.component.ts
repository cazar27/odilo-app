import { Component, OnInit } from '@angular/core';

import { ChartConfiguration } from "chart.js";
import { catchError, throwError } from 'rxjs';
import { GitHubUser } from 'src/app/interfaces/githubuser.interface';
import { AlertService } from 'src/app/services/alert.service';
import { GithubService } from 'src/app/services/github.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public barChartLegend: boolean = true;
  public barChartPlugins = [];
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    datasets: []
  };
  private username: string = '';
  users: GitHubUser[] = [];

  constructor(
    private githubService: GithubService,
    private userDataService: UserDataService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.userDataService.getUsername().subscribe(username => {
      this.username = username;
      this.loadUsers();

    });

    this.githubService.currentPage$.subscribe(() => {
      this.loadUsers();
    });
  }

  private loadUsers(): void {
    this.alertService.clear();
    this.users = [];

    if (this.username && this.username.length >= 4 && this.username.toLowerCase() !== 'gcpglobal') {
      this.githubService.getInfoUsers(this.username)
        .pipe(
          catchError(error => {
            console.error('Error: ', error);
              if(error.message === 'User not found')
                this.alertService.warn(`Chart ${error}`)
              else
                this.alertService.error(`Chart ${error.error.message}`)
            this.restart();
            return throwError(() => error);
          })
        )
        .subscribe(data => {
          if (data.length > 0) {
            this.users = data;
            const labels: string[] = [];
            const dataset: number[] = [];
            this.users.forEach(user => {
              labels.push(`${user.login.substring(0,9)}${user.login.length>9?'...':''}`);
              dataset.push(user.followers ? user.followers.length : 0);
            })
            this.barChartData = {
              labels: labels,
              datasets: [
                { data: dataset, label: 'Followers' },
              ]
            };
          } else {
            this.restart();
          }
        });
    }
  }

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  private restart() {
    this.users = [];
    this.barChartData = {
      labels: [],
      datasets: []
    };
  }

}
