import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordValidator } from 'src/app/shared/services/validators';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  submitted = false;

  killSubscription = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      // tslint:disable-next-line: max-line-length
      repeatPassword: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20), passwordValidator(() => this.registerForm?.get('password'), this.killSubscription)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.killSubscription.next();
    this.killSubscription.complete();
  }
}
