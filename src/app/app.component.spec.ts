import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { AppModule } from './app.module';

describe('AppComponent', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule,AppModule],
    declarations: [AppComponent, HeaderComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Odilo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Odilo');
  });

  it(`should have as isDark 'false'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isDark).toEqual(false);
  });
});
