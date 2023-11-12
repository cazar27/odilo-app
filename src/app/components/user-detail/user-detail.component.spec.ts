import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { UserDetailComponent } from './user-detail.component';
import { GithubService } from 'src/app/services/github.service';
import { AlertService } from 'src/app/services/alert.service';
import { GitHubUser } from 'src/app/interfaces/githubuser.interface';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let githubService: jasmine.SpyObj<GithubService>;
  let alertService: jasmine.SpyObj<AlertService>;

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
    activatedRoute = {
      params: of({ login: 'testUser' }),
    } as any;

    githubService = jasmine.createSpyObj('GithubService', ['getUserDetailsInfoByLogin']);
    githubService.getUserDetailsInfoByLogin.and.returnValue(of([mockGitHubUser]));

    alertService = jasmine.createSpyObj('AlertService', ['error']);

    TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
        { provide: GithubService, useValue: githubService },
        { provide: AlertService, useValue: alertService },
      ],
    });

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
