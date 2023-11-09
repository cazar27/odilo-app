import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { GithubService } from 'src/app/services/github.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let activatedRoute: ActivatedRoute;
  const githubService = jasmine.createSpyObj('GithubService', ['getInfoUsers','getUserDetailsByLogin']);

  beforeEach(() => {
    const activatedRoute = {
      paramMap: of({ get: (param: string) => '/home/user' }),
    } as ActivatedRoute;

    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [
        GithubService,
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: GithubService, githubService: githubService }
      ],
      imports: [HttpClientModule, AppModule],
    });
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
