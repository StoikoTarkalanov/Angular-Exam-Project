import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Exam-Project';

  get isAuth(): boolean {
    return this.authService.user === undefined;
  }

  constructor(private authService: AuthService) {
    // this.authService.getUserData().subscribe({
    //   error: () => {
    //     this.authService.user = null;
    //   }
    // });
  }
}
