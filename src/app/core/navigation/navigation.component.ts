import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  get isLogged(): boolean {
    return this.authService.isUserLogged;
  }

  onLogout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
}
