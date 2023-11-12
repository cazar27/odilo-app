import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormComponent } from './search-form.component';
import { AppModule } from 'src/app/app.module';
import { ComponentsModule } from 'src/app/modules/components/components.module';
import { UserDataService } from 'src/app/services/user-data.service';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let userDataServiceSpy: jasmine.SpyObj<UserDataService>;
  
  beforeEach(() => {
    userDataServiceSpy = jasmine.createSpyObj('UserDataService', ['setUsername','getUserName']);
    TestBed.configureTestingModule({
      imports: [AppModule, ComponentsModule],
      declarations: [SearchFormComponent],
      providers: [
        { provide: UserDataService, userDataService: userDataServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should call setUsername method', () => {
    const username = 'carlos';
    component.myForm.setValue({ username });
    const onSubmitSpy = spyOn(component, 'onSubmit').and.callThrough();
    component.onSubmit();
    expect(onSubmitSpy).toHaveBeenCalled();
  });
});
