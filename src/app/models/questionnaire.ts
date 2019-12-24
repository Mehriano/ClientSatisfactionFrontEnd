import { Question } from "./question";

export class Questionnaire {
  _id?: string;
  titreQuestionnaire: string;
  questions: Question[];
}
