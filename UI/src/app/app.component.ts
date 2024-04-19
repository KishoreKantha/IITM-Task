import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from './service/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public router: Router, public theme: ThemeService) { }
  title = 'UI';
  darkTheme: boolean = false;
}
