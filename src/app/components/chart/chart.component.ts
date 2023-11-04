import { Component, OnInit } from '@angular/core';

import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
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
  private users: GitHubUser[] = [];
  private currentPage: number = 1;

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
  }

  private loadUsers(): void {
    this.alertService.clear();
    this.users = [];

    if (this.username && this.username.length >= 4 && this.username.toLowerCase() !== 'gcpglobal') {
      this.githubService.getInfoUsers(this.username,1)
        .subscribe(data => {
          if (data.length > 0) {
            this.users = data;
            const labels: string []= []
            const dataset: number []= []
            this.users.forEach(user=> {
              labels.push(user.login)
              dataset.push(user.followers?user.followers.length:0);
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
        })
    } else {
      this.restart();
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
