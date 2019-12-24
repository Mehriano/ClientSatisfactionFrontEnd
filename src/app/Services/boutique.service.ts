import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { Boutique } from "../models/Boutique";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://localhost:3000/api/boutique";
@Injectable({
  providedIn: "root"
})
export class BoutiqueService {
  constructor(private http: HttpClient) {}
  getBoutiques(): Observable<Boutique[]> {
    return this.http.get<Boutique[]>(apiUrl).pipe(
      tap(() => console.log("fetched Boutiques")),
      catchError(this.handleError("getBoutiques", []))
    );
  }

  getBoutique(id: number): Observable<Boutique> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Boutique>(url).pipe(
      tap(_ => console.log(`fetched Boutique id=${id}`)),
      catchError(this.handleError<Boutique>(`getBoutique id=${id}`))
    );
  }

  addBoutique(boutique): Observable<Boutique> {
    return this.http.post<Boutique>(apiUrl, boutique, httpOptions).pipe(
      tap((boutique: Boutique) =>
        console.log(`added Boutique w/ id=${boutique._id}`)
      ),
      catchError(this.handleError<Boutique>("addBoutique"))
    );
  }

  updateBoutique(id, Boutique): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Boutique, httpOptions).pipe(
      tap(_ => console.log(`updated Boutique id=${id}`)),
      catchError(this.handleError<any>("updateBoutique"))
    );
  }

  deleteBoutique(id): Observable<Boutique> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Boutique>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Boutique id=${id}`)),
      catchError(this.handleError<Boutique>("deleteBoutique"))
    );
  }
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
