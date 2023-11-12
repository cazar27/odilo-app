import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CanActivateFn, Router } from '@angular/router';
import { scoreControlGuard } from './score-control.guard';
import { GithubService } from '../services/github.service';
import { AlertService } from '../services/alert.service';
import { of, throwError } from 'rxjs';

describe('scoreControlGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
  TestBed.runInInjectionContext(() => scoreControlGuard(...guardParameters));

  let githubService: jasmine.SpyObj<GithubService>;
  let alertService: jasmine.SpyObj<AlertService>;
  let router: Router;

  beforeEach(() => {
    githubService = jasmine.createSpyObj('GithubService', ['getUserScoreByLogin']);
    alertService = jasmine.createSpyObj('AlertService', ['error']);
    
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: GithubService,
          useValue: githubService,
        },
        {
          provide: AlertService,
          useValue: alertService,
        },
      ],
    });

    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

});
