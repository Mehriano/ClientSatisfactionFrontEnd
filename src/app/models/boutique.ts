import { Zone } from "./zone";

export class Boutique {
  public _id?: string;
  public nom: string;
  public zone: Zone;
  public zoneId?: string;
  public responsable?: any;
  public responsableId?: string;
  public questionnaire?: any;
  public uuid: number;
  public lieu: string;
}
