import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBook } from 'src/app/shared/interfaces';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  killSubscription!: Subscription;
  books: IBook;
  haveBookCheck: boolean;
  page = 1;
  loading = this.loader.currentLoad;

  constructor(
    private userService: UserService,
    public loader: LoadingService
  ) { }

  ngOnInit(): void {
    this.killSubscription = this.userService.getAllBooks().subscribe({
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
    if (this.books?.results.length > 0) {
      this.killSubscription.unsubscribe();
    }
  }
}
