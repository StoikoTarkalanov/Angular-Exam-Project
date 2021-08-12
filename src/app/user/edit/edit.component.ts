import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataPassingService } from 'src/app/shared/services/data-passing/data-passing.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { urlValidator } from 'src/app/shared/services/validators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  editForm: FormGroup;
  bookId = this.route.snapshot.paramMap.get('id');
  killSubscription!: Subscription;
  data;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dataService: DataPassingService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.killSubscription = this.dataService.stream.subscribe(data => this.data = data);

    this.editForm = this.formBuilder.group({
      name: [`${this.data.name}`, [Validators.required, Validators.minLength(4), Validators.maxLength(80)]],
      image: [`${this.data.image}`, [Validators.required, Validators.maxLength(2048), urlValidator()]],
      content: [`${this.data.content}`, [Validators.required, Validators.minLength(200), Validators.maxLength(4000)]],
    });
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      return;
    }
    this.killSubscription = this.userService.edit(this.bookId, this.editForm.value).subscribe({
      next: () => {
        this.router.navigate([`/single-book/${this.bookId}`]);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.editForm.valid) {
      this.killSubscription.unsubscribe();
    }
  }
}
