import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { RouterOutlet } from '@angular/router';
import { fadeInAnimation } from './animations/slide.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInAnimation]
})
export class AppComponent {
  title = 'Odilo';
  isDark: boolean = false;

  constructor(private themeService: ThemeService) {
    this.themeService.getTheme().subscribe(theme => {
      this.isDark = theme;
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
