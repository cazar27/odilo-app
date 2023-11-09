import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpConfigInterceptor } from './http-config.interceptor';
import { environment } from 'environments/environment.prod';

describe('HttpConfigInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpConfigInterceptor,
          multi: true
        }
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should add Authorization header to the request', () => {
    const dummyUrl = 'https://api.example.com/data';
    const dummyResponse = { message: 'Data fetched successfully' };

    http.get(dummyUrl).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const httpRequest = httpMock.expectOne(dummyUrl);
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
    expect(httpRequest.request.headers.get('Authorization')).toBe('Bearer '+ environment.githubApiToken);

    httpRequest.flush(dummyResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
