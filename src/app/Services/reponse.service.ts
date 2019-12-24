import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { Reponse } from "../models/reponse";
import { tap } from "rxjs/operators";
import { Question } from "../models/question";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
const apiUrl = "http://localhost:3000/api/reponse";
@Injectable({
  providedIn: "root"
})
export class ReponseService {
  constructor(private http: HttpClient) {}

  postResponses(reponses) {
    return this.http
      .post<string>(apiUrl, reponses, httpOptions)
      .pipe(tap(() => console.log("sending...")));
  }
  getReponseQuestion(id) {
    return this.http
      .get<any>(`${apiUrl}/question/${id}`)
      .pipe(tap(() => console.log("sending...")));
  }
  getQuestionsWithProps() {
    return this.http.get<Question>(`${apiUrl}/questions`);
  }
  getReponseQuestionnaire(id){
    return this.http
    .get<any>(`${apiUrl}/questionnaire/${id}`);
  }
}
