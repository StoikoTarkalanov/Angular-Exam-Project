import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // tslint:disable-next-line: typedef
  get isLogged() {
    return this.authService.isUserLogged;
  }

  // tslint:disable-next-line: typedef
  get username() {
    return this.authService.username;
  }

  onLogout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
