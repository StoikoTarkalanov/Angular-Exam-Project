import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBook } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit, OnDestroy {
  killSubscription!: Subscription;
  books: IBook;
  haveBookCheck: boolean;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.killSubscription = this.userService.getUserBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.haveBookCheck = books?.results.length > 0 ? true : false;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.books.results.length > 0) {
      this.killSubscription.unsubscribe();
    }
  }
}
