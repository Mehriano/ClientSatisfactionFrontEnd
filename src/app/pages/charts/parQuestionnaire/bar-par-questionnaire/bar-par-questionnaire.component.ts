import { Component, OnInit } from "@angular/core";
import { single } from "../../charts.data";
import { AppSettings } from "../../../../app.settings";
import { Settings } from "../../../../app.settings.model";
import { ReponseService } from "src/app/Services/reponse.service";
import { QuestionnaireService } from "src/app/Services/questionnaire.service";

@Component({
  selector: "app-bar-par-questionnaire",
  templateUrl: "./bar-par-questionnaire.component.html"
})
export class BarParQuestionnaireComponent implements OnInit {
  public single: any[];
  public multi: any[];
  public ddata: any;
  public questionnaires;
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = "Proposition";
  public showYAxisLabel = true;
  public yAxisLabel = "Answers";
  public colorScheme = {
    domain: ["#2F3E9E", "#D22E2E", "#378D3B", "#0096A6", "#F47B00", "#606060"]
  };
  public settings: Settings;

  constructor(
    public appSettings: AppSettings,
    public rs: ReponseService,
    private qs: QuestionnaireService
  ) {
    this.settings = this.appSettings.settings;
  }
  ngOnInit() {
    this.qs.getQuestionnaires().subscribe(res => {
      this.questionnaires = res;
    });
  }
  public onSelect(event) {
    console.log(event);
  }
  showStat(a) {
    this.rs.getReponseQuestionnaire(a).subscribe(result => {
      console.log(a);
      this.ddata = result;
      console.log(result);
      Object.assign(this, { single, multi: result });
    });
  }
}
