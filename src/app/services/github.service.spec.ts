import { TestBed } from '@angular/core/testing';

import { GithubService } from './github.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpConfigInterceptor } from '../interceptors/http-config.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

describe('GithubService', () => {
  let service: GithubService;
  let httpTestingController: HttpTestingController;
  let currentPageSubjectSpy: jasmine.SpyObj<BehaviorSubject<number>>;
  
  beforeEach(() => {
    const spySubject = jasmine.createSpyObj('BehaviorSubject', ['next']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpConfigInterceptor,
          multi: true,
        },
        { provide: BehaviorSubject, useValue: spySubject }
      ],
    });

    service = TestBed.inject(GithubService);
    httpTestingController = TestBed.inject(HttpTestingController);
    currentPageSubjectSpy = TestBed.inject(BehaviorSubject) as jasmine.SpyObj<BehaviorSubject<number>>;
  });

  
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should spy on get and set for currentPage', () => {
    const getPageSpy = spyOnProperty(service, 'currentPage', 'get').and.returnValue(5);
    const setPageSpy = spyOnProperty(service, 'currentPage', 'set');
    expect(service.currentPage).toEqual(5);
    expect(getPageSpy).toHaveBeenCalled();
    service.currentPage = 10;
    expect(setPageSpy).toHaveBeenCalled();
  });

  it('should call getUsers with the correct parameters', () => {
    const username = 'testUser';
    const page = 1;
    service.getUsers(username, page).subscribe();
    const req = httpTestingController.expectOne(
      `${service['_apiUrl']}?q=${username}&page=${page}&per_page=${service['_itemsPerPage']}`
    );
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should call getByUrl with the correct parameter', () => {
    const userFwUrl = 'https://api.github.com/users/testUser';
    service.getByUrl(userFwUrl).subscribe();
    const req = httpTestingController.expectOne(userFwUrl);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should call getUserDetailsByLogin with the correct parameter', () => {
    const login = 'testUser';
    service.getUserDetailsByLogin(login).subscribe();
    const req = httpTestingController.expectOne(
      `${service['_apiUrl']}?q=${login}`
    );
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

});
