import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import { AppModule } from 'src/app/app.module';
import { ComponentsModule } from 'src/app/modules/components/components.module';
import { UserDataService } from 'src/app/services/user-data.service';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  const userDataService = jasmine.createSpyObj('UserDataService', ['setUsername','getUserName']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, ComponentsModule],
      declarations: [SearchFormComponent],
      providers: [
        { provide: UserDataService, userDataService: userDataService }
      ]
    });
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
