import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { HeaderComponent } from './header.component';
import { ThemeService } from 'src/app/services/theme.service';
import { ComponentsModule } from 'src/app/modules/components/components.module';
import { AppModule } from 'src/app/app.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let themeService: jasmine.SpyObj<ThemeService>;

  beforeEach(() => {
    const themeServiceSpy = jasmine.createSpyObj('ThemeService', ['setTheme']);

    TestBed.configureTestingModule({
      imports: [AppModule, ComponentsModule, MatSlideToggleModule],
      declarations: [HeaderComponent],
      providers: [
        { provide: ThemeService, useValue: themeServiceSpy }
      ]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService) as jasmine.SpyObj<ThemeService>;
  });

  it('should create the HeaderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle themeDark property and call themeService.setTheme', () => {
    expect(component.themeDark).toBeFalse();
    component.changeTheme();
    expect(component.themeDark).toBeTrue();
    expect(themeService.setTheme).toHaveBeenCalledWith(true);
    component.changeTheme();
    expect(component.themeDark).toBeFalse();
    expect(themeService.setTheme).toHaveBeenCalledWith(false);
  });
});
