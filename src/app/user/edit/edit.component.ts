import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/shared/services/user/user.service';
import { urlValidator } from 'src/app/shared/services/validators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  killSubscription = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  // tslint:disable-next-line: max-line-length
  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]],
      image: ['', [Validators.required, Validators.maxLength(2048), Validators.pattern('^https?:\/\/'), urlValidator()]],
      content: ['', [Validators.required, Validators.minLength(200), Validators.maxLength(4000)]],
    });
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      return;
    }
    this.userService.edit(this.editForm.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.killSubscription.next();
    this.killSubscription.complete();
  }
}
