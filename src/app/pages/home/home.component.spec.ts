import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { SearchFormComponent } from 'src/app/components/search-form/search-form.component';
import { ChartComponent } from 'src/app/components/chart/chart.component';
import { UserListComponent } from 'src/app/components/user-list/user-list.component';
import { GithubService } from 'src/app/services/github.service';
import { AppModule } from 'src/app/app.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from 'src/app/modules/components/components.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        SearchFormComponent,
        ChartComponent,
        UserListComponent
      ],
      providers: [GithubService],
      imports: [HttpClientModule, AppModule,ComponentsModule],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set username when search is called with a non-empty string', () => {
    const username = 'testUser';
    component.search(username);
    expect(component.username).toEqual(username);
  });

  it('should not set username when search is called with an empty string', () => { 
    const emptyUsername = '';
    component.search(emptyUsername);
    expect(component.username).toEqual('');
  });
});
