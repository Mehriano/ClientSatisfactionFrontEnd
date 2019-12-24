import { Component } from "@angular/core";
import { single, multi } from "../charts.data";
import { AppSettings } from "../../../app.settings";
import { Settings } from "../../../app.settings.model";
import { ReponseService } from "src/app/Services/reponse.service";
import { QuestionnaireService } from "src/app/Services/questionnaire.service";

@Component({
  selector: "app-pie",
  templateUrl: "./pie.component.html"
})
export class PieComponent {
  public single: any[];
  public multi: any[];
  public showLegend = true;
  public gradient = true;
  public colorScheme = {
    domain: ["#2F3E9E", "#D22E2E", "#378D3B", "#0096A6", "#F47B00", "#606060"]
  };
  public showLabels = true;
  public explodeSlices = false;
  public doughnut = false;
  public settings: Settings;
  public ddata: any;
  public questionnaires;

  constructor(
    public appSettings: AppSettings,
    public rs: ReponseService,
    private qs: QuestionnaireService
  ) {
    this.settings = this.appSettings.settings;
    Object.assign(this, { single, multi });
  }
  ngOnInit() {
    this.qs.getQuestionnaires().subscribe(res => {
      this.questionnaires = res;
    });
  }
  showStat(a) {
    this.rs.getReponseQuestionnaire(a).subscribe(result => {
      console.log(a);
      this.ddata = result;
      console.log(result);
      Object.assign(this, { single, multi: result });
    });
  }
  public onSelect(event) {
    console.log(event);
  }
}
