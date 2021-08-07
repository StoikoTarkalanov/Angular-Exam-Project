import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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
  books: IBook;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.killSubscription = this.userService.getAllBooks().subscribe({
      next: (books) => {
        this.books = books;
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
