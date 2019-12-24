import { Component, OnInit } from "@angular/core";
import { multi } from "../charts.data";
import { AppSettings } from "../../../app.settings";
import { Settings } from "../../../app.settings.model";
import { ReponseService } from "src/app/Services/reponse.service";

@Component({
  selector: "app-bar",
  templateUrl: "./bar.component.html"
})
export class BarComponent implements OnInit {
  public single: any[];
  public multi: any[];
  public ddata: any;
  public questions;
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

  constructor(public appSettings: AppSettings, public rs: ReponseService) {
    this.settings = this.appSettings.settings;
  }
  ngOnInit() {
    this.rs.getQuestionsWithProps().subscribe(res => {
      this.questions = res;
    });
  }
  public onSelect(event) {
    console.log(event);
  }
  showStat(a) {
    this.rs.getReponseQuestion(a).subscribe(result => {
      this.ddata = result;
      this.single = result.repones;
      Object.assign(this, { single: result.reponses, multi });
    });
  }
}
