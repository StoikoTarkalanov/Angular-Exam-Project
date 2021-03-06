import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBook } from 'src/app/shared/interfaces';
import { DataPassingService } from 'src/app/shared/services/data-passing/data-passing.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit, OnDestroy {
  killSubscription!: Subscription;
  book: IBook;
  bookId = this.route.snapshot.paramMap.get('id');
  userId = sessionStorage.getItem('userId');
  isOwner;
  data = { name: '', image: '', content: '' };

  constructor(
    private userService: UserService,
    private dataService: DataPassingService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.killSubscription = this.userService.getBookById(this.bookId).subscribe({
      next: (book) => {
        this.book = book;
        this.data.name = book.name;
        this.data.image = book.image;
        this.data.content = book.content;

        this.isOwner = this.book?.owner.objectId === this.userId;
      }
    });

    this.dataService.changeData(this.data);
  }

  onDelete(): void {
    const confirmed = confirm('Are you sure you want to delete this book?');
    if (confirmed) {
      this.killSubscription = this.userService.delete(this.bookId).subscribe({
        next: () => {
          this.router.navigate(['/my-books']);
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
