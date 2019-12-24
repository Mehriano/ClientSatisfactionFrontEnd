import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { Zone } from "../models/zone";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://localhost:3000/api/zone";
@Injectable({
  providedIn: "root"
})
export class ZoneService {
  constructor(private http: HttpClient) {}
  getZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(apiUrl).pipe(
      tap(heroes => console.log("fetched Zones")),
      catchError(this.handleError("getZones", []))
    );
  }

  getZone(id: number): Observable<Zone> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Zone>(url).pipe(
      tap(_ => console.log(`fetched Zone id=${id}`)),
      catchError(this.handleError<Zone>(`getZone id=${id}`))
    );
  }

  addZone(Zone): Observable<Zone> {
    return this.http.post<Zone>(apiUrl, Zone, httpOptions).pipe(
      tap((Zone: Zone) => console.log(`added Zone w/ id=${Zone._id}`)),
      catchError(this.handleError<Zone>("addZone"))
    );
  }

  updateZone(id, Zone): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, Zone, httpOptions).pipe(
      tap(_ => console.log(`updated Zone id=${id}`)),
      catchError(this.handleError<any>("updateZone"))
    );
  }

  deleteZone(id): Observable<Zone> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Zone>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Zone id=${id}`)),
      catchError(this.handleError<Zone>("deleteZone"))
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
