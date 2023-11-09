import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';
import { GithubService } from 'src/app/services/github.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let activatedRoute: ActivatedRoute;
  const githubService = jasmine.createSpyObj('GithubService', ['getInfoUsers','getUserDetailsByLogin']);

  beforeEach(() => {
    activatedRoute = {
      paramMap: of({ get: (param: string) => '/home/user' }),
    } as ActivatedRoute;

    TestBed.configureTestingModule({
      declarations: [ChartComponent],
      providers: [
        GithubService,
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: GithubService, githubService: githubService }
      ],
      imports: [HttpClientModule, AppModule],
    });
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
