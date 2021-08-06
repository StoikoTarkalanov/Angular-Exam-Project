import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBook } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  killSubscription!: Subscription;
  books: IBook[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.killSubscription = this.userService.getAllBooks().subscribe({
      next: (books) => {
        this.books = books;
        console.log(this.books[0]);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.killSubscription.unsubscribe();
  }
}
