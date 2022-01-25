import {Component, OnInit} from '@angular/core';
import {BookService} from "../service/book.service";
import {Router} from "@angular/router";
import {Book} from "../model/book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books!: Book[];

  displayedColumns: string[] = ['author', 'title', 'category', 'action'];

  constructor(
    private bookService: BookService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getBooks();
  }

  private getBooks() {
    this.bookService.getBook().subscribe(data => {
      this.books = data;
    });
  }

  bookDetails(id: number) {
    this.router.navigate(['book/book-details', id]);
  }

  updateBook(id: number) {
    this.router.navigate(['book/book-update', id]);
  }

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(data => {
      console.log(data);
      this.getBooks();
    })
  }

}
