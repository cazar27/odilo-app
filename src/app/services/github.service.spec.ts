import { TestBed } from '@angular/core/testing';

import { GithubService } from './github.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpConfigInterceptor } from '../interceptors/http-config.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

describe('GithubService', () => {
  let service: GithubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpConfigInterceptor,
          multi: true,
        },
      ],
    });
    service = TestBed.inject(GithubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
