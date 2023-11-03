import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Odilo';
  isDark:boolean = false;

  constructor(private themeService: ThemeService) {
    this.themeService.getTheme().subscribe(theme => {
      this.isDark = theme;
    });

  }
}
