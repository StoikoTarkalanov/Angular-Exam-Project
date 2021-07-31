import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

function isMatch(c: AbstractControl): { [key: string]: boolean } | null {
  let passwordControl = c.get('password');
  let confirmControl = c.get('repeatPassword');

  if (passwordControl!.pristine || confirmControl!.pristine) {
    return null;
  }

  if (passwordControl!.value === confirmControl!.value) {
    return null;
  }

  return { 'isMatch': true };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      passwordsGroup: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        repeatPassword: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
      }, { validator: isMatch })
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      alert('Form Submitted succesfully!\n Check the values in browser console.');
      console.table(this.registerForm.value);
    }
  }
}
