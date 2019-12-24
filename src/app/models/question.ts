import { Proposition } from "./proposition";
import { Reponse } from "./reponse";

export class Question {
  _id?: string;
  titreQuestion: string;
  type: string;
  order?: number;
  propositions?: [Proposition];
  reponses?: Reponse[];
}
