import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Book} from "../model/book";
import {environment} from "../../environments/environment";

@Injectable({providedIn: "root"})
export class BookService {

  constructor(private http: HttpClient) {
  }

  public getBook(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.API_URL}/books/all`)
  }

  public getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(`${environment.API_URL}/books/${bookId}`)
  }

  public addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${environment.API_URL}/books`, book)
  }

  public updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${environment.API_URL}/books`, book)
  }

  public deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${environment.API_URL}/books/${bookId}`)
  }
}
