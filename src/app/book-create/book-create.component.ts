import {Component, OnInit} from '@angular/core';
import {Book} from "../model/book";
import {BookService} from "../service/book.service";
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    category: new FormControl(''),
    publishYear: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        title: ['', Validators.required],
        author: ['', Validators.required],
        category: ['', [Validators.required]],
        publishYear: ['', [Validators.required]],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  saveBook() {
    let book = this.form.value as Book
    this.bookService.addBook(book).subscribe(data => {
        console.log(data);
        this.goToBookList();
      },
      error => console.log(error));
  }

  goToBookList() {
    console.log("redirect to book list");
    this.router.navigate(['book']);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      console.log("invalid");
      return;
    }
    this.saveBook();
  }
}
