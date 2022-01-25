import {Component, OnInit} from '@angular/core';
import {Book} from "../model/book";
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../service/book.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {
  id!: number;
  book: Book = {} as Book;

  updateForm!: FormGroup;
  submitted = false;

  constructor(private bookService: BookService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {

    this.updateForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        author: ['', Validators.required],
        category: ['', [Validators.required]],
        publishYear: ['', [Validators.required]],
      }
    );
    this.id = this.route.snapshot.params['id'];

    this.bookService.getBookById(this.id).subscribe(data => {
      this.book = data;
      console.log(this.book)
      this.populateForm();
    }, error => console.log(error));

  }

  populateForm(): void {
    this.updateForm.patchValue({
      'title': this.book.title,
      'author': this.book.author,
      'publishYear': this.book.publishYear,
      'category': this.book.category,
      'id': this.book.id
    })
  }

  get f() {
    return this.updateForm.controls;
  }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.updateForm.invalid) {
      return;
    }
    const bookToUpdate: Book = {
      id: this.id,
      author: this.f['author'].value,
      title: this.f['title'].value,
      category: this.f['category'].value,
      publishYear: this.f['publishYear'].value
    }

    this.bookService.updateBook(bookToUpdate).subscribe(data => {
      this.goToBookList();
    }, error => console.log(error));
  }

  goToBookList() {
    this.router.navigate(['book']);
  }

}
