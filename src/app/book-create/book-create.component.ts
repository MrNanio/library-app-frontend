import {Component, OnInit} from '@angular/core';
import {Book} from "../model/book";
import {BookService} from "../service/book.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  book: Book = {} as Book;

  constructor(
    private bookService: BookService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  saveBook() {
    this.bookService.addBook(this.book).subscribe(data => {
        console.log(data);
        this.goToBookList();
      },
      error => console.log(error));
  }

  goToBookList() {
    console.log("kurwa");
    this.router.navigate(['book']);
  }

  onSubmit() {
    console.log(this.book);
    this.saveBook();
  }

}
