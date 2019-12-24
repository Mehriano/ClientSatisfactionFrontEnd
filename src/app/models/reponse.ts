import { Proposition } from "./proposition";

export class Reponse {
  _id?: string;
  numFacture?: string;
  contenuReponse?: string;
  proposition?: Proposition;
  Propositions?: Proposition[];
}
