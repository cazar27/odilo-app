import { Component } from '@angular/core';

import { ThemeService } from 'src/app/services/theme.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private themeService: ThemeService) { }

  themeDark: boolean = false;

  changeTheme() {
    this.themeDark = !this.themeDark;
    this.themeService.setTheme(this.themeDark);
  }
}
