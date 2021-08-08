import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBook } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit, OnDestroy, AfterViewInit {
  killSubscription!: Subscription;
  book: IBook;
  bookId = this.route.snapshot.paramMap.get('id');
  userId = sessionStorage.getItem('userId');

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.killSubscription = this.userService.getBookById(this.bookId).subscribe({
      next: (book) => {
        this.book = book;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.book?.userData.userId === this.userId) {
      document.getElementById('adm-element').style.display = 'block';
    } else {
      document.getElementById('adm-element').style.display = 'none';
    }
  }

  onDelete(): void {
    const confirmed = confirm('Are you sure you want to delete this book?');
    if (confirmed) {
      this.killSubscription = this.userService.delete(this.bookId).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.book) {
      this.killSubscription.unsubscribe();
    }
  }
}
