import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { SharedModule } from "../../shared/shared.module";
import { BarComponent } from "./bar/bar.component";
import { BubbleComponent } from "./bubble/bubble.component";
import { LineComponent } from "./line/line.component";
import { PieComponent } from "./pie/pie.component";
import { ReponseService } from "src/app/Services/reponse.service";
import { SelectComponent } from "../form-controls/select/select.component";
import { FormsModule } from "@angular/forms";
import { BarParQuestionnaireComponent } from "./parQuestionnaire/bar-par-questionnaire/bar-par-questionnaire.component";

export const routes = [
  { path: "", redirectTo: "bar", pathMatch: "full" },
  {
    path: "barparquestion",
    component: BarComponent,
    data: { breadcrumb: "Bar Par Question" }
  },
  {
    path: "barparquestionnaire",
    component: BarParQuestionnaireComponent,
    data: { breadcrumb: "Bar Par Questionnaire" }
  },
  {
    path: "pieparquestionnaire",
    component: PieComponent,
    data: { breadcrumb: "Pie par Questionnaire" }
  },
  {
    path: "line",
    component: LineComponent,
    data: { breadcrumb: "Line Charts" }
  },
  {
    path: "bubble",
    component: BubbleComponent,
    data: { breadcrumb: "Bubble Charts" }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxChartsModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    BarComponent,
    BubbleComponent,
    LineComponent,
    PieComponent,
    BarParQuestionnaireComponent
  ],
  providers: [ReponseService]
})
export class ChartsModule {}
