import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { UserDetailComponent } from './user-detail.component';
import { GithubService } from 'src/app/services/github.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from 'src/app/app.module';
import { GitHubUser } from '../../interfaces/githubuser.interface';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let activatedRoute: ActivatedRoute;
  const githubService = jasmine.createSpyObj('GithubService', ['getUserDetailsInfoByLogin']);
  const mockGitHubUser: GitHubUser = {
    "login": "cazar27",
    "id": 17564946,
    "node_id": "MDQ6VXNlcjE3NTY0OTQ2",
    "avatar_url": "https://avatars.githubusercontent.com/u/17564946?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/cazar27",
    "html_url": "https://github.com/cazar27",
    "followers_url": "https://api.github.com/users/cazar27/followers",
    "following_url": "https://api.github.com/users/cazar27/following{/other_user}",
    "gists_url": "https://api.github.com/users/cazar27/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/cazar27/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/cazar27/subscriptions",
    "organizations_url": "https://api.github.com/users/cazar27/orgs",
    "repos_url": "https://api.github.com/users/cazar27/repos",
    "events_url": "https://api.github.com/users/cazar27/events{/privacy}",
    "received_events_url": "https://api.github.com/users/cazar27/received_events",
    "type": "User",
    "site_admin": false,
    "score": 1
  };

  beforeEach(() => {
    githubService.getUserDetailsInfoByLogin.and.returnValue(of(mockGitHubUser));
    activatedRoute = {
      paramMap: of({ get: (param: string) => 'cazar27' }),
    } as ActivatedRoute;

    TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      providers: [
        GithubService,
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: GithubService, githubService: githubService }
      ],
      imports: [HttpClientModule, AppModule],
    });
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
