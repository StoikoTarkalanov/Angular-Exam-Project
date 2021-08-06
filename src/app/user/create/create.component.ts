import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/shared/services/user/user.service';
import { urlValidator } from 'src/app/shared/services/validators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
  createForm: FormGroup;
  killSubscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(80)]],
      image: ['', [Validators.required, Validators.maxLength(2048), urlValidator()]],
      content: ['', [Validators.required, Validators.minLength(200), Validators.maxLength(4000)]],
    });
  }

  onSubmit(): void {
    if (this.createForm.invalid) {
      return;
    }
    this.killSubscription = this.userService.create(this.createForm.value, sessionStorage.getItem('userId')).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.createForm.valid) {
      this.killSubscription.unsubscribe();
    }
  }
}
