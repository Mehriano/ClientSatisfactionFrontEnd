import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { Questionnaire } from "../models/questionnaire";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://localhost:3000/api/questionnaire";
@Injectable({
  providedIn: "root"
})
export class QuestionnaireService {
  constructor(private http: HttpClient) {}
  getQuestionnaires(): Observable<Questionnaire[]> {
    return this.http.get<Questionnaire[]>(apiUrl).pipe(
      tap(heroes => console.log("fetched Questionnaires")),
      catchError(this.handleError("getQuestionnaires", []))
    );
  }

  getQuestionnaire(id: number): Observable<Questionnaire> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Questionnaire>(url).pipe(
      tap(_ => console.log(`fetched Questionnaire id=${id}`)),
      catchError(this.handleError<Questionnaire>(`getQuestionnaire id=${id}`))
    );
  }
  getQuestionnaireByNumFacture(numFacture): Observable<Questionnaire>{
    return this.http.get<Questionnaire>(apiUrl+`/numfacture/${numFacture}`);
  }

  addQuestionnaire(Questionnaire): Observable<Questionnaire> {
    return this.http
      .post<Questionnaire>(apiUrl, Questionnaire, httpOptions)
      .pipe(
        tap((Questionnaire: Questionnaire) =>
          console.log(`added Questionnaire w/ id=${Questionnaire._id}`)
        ),
        catchError(this.handleError<Questionnaire>("addQuestionnaire"))
      );
  }

  updateQuestionnaire(id, Questionnaire): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Questionnaire, httpOptions).pipe(
      tap(_ => console.log(`updated Questionnaire id=${id}`)),
      catchError(this.handleError<any>("updateQuestionnaire"))
    );
  }

  deleteQuestionnaire(id): Observable<Questionnaire> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Questionnaire>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Questionnaire id=${id}`)),
      catchError(this.handleError<Questionnaire>("deleteQuestionnaire"))
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
