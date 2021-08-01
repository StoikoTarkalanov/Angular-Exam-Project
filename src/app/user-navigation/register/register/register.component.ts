import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

function isMatch(c: AbstractControl): { [key: string]: boolean } | null {
  const passwordControl = c.get('password');
  const confirmControl = c.get('repeatPassword');

  if (passwordControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (passwordControl.value === confirmControl.value) {
    return null;
  }

  return { isMatch: true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      passwordsGroup: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        repeatPassword: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
      }, { validator: isMatch })
    });
  }

  onSubmit() {
    const registerObserver = {
      next: x => console.log('User created'),
      error: err => console.log(err)
    };
    this.authService.register(this.registerForm.value).subscribe(registerObserver);
  }
}
