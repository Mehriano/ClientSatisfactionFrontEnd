import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { Ville } from "../models/ville";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://localhost:3000/api/ville";
@Injectable({
  providedIn: "root"
})
export class VilleService {
  constructor(private http: HttpClient) {}
  getVilles(): Observable<Ville[]> {
    return this.http.get<Ville[]>(apiUrl).pipe(
      tap(heroes => console.log("fetched Villes")),
      catchError(this.handleError("getVilles", []))
    );
  }

  getVille(id: number): Observable<Ville> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Ville>(url).pipe(
      tap(_ => console.log(`fetched Ville id=${id}`)),
      catchError(this.handleError<Ville>(`getVille id=${id}`))
    );
  }

  addVille(Ville): Observable<Ville> {
    return this.http.post<Ville>(apiUrl, Ville, httpOptions).pipe(
      tap((Ville: Ville) => console.log(`added Ville w/ id=${Ville._id}`)),
      catchError(this.handleError<Ville>("addVille"))
    );
  }

  updateVille(id, Ville): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Ville, httpOptions).pipe(
      tap(_ => console.log(`updated Ville id=${id}`)),
      catchError(this.handleError<any>("updateVille"))
    );
  }

  deleteVille(id): Observable<Ville> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Ville>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Ville id=${id}`)),
      catchError(this.handleError<Ville>("deleteVille"))
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
