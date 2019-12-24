import { Component, OnInit } from "@angular/core";
import { Questionnaire } from "src/app/models/questionnaire";
import { QuestionnaireService } from "src/app/Services/questionnaire.service";
import { MatDialog } from "@angular/material";
import { DialogDeleteItemDialog } from "src/app/shared/dialog-delete/dialog-delete-item-dialog";

@Component({
  selector: "app-questionnaires",
  templateUrl: "./questionnaires.component.html",
  styleUrls: ["./questionnaires.component.scss"]
})
export class QuestionnairesComponent implements OnInit {
  displayedColumns: string[] = ["questionnaire_nom", "delete"];
  data: Questionnaire[] = [];
  isLoadingResults = true;
  constructor(
    private questionnaireService: QuestionnaireService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.questionnaireService.getQuestionnaires().subscribe(
      res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
  openDialog(event, questionnaire): void {
    event.stopPropagation();
    let dialogRef = this.dialog.open(DialogDeleteItemDialog, {
      data: {
        name: questionnaire.titreQuestioannaire,
        item: "Questionnaire",
        _id: questionnaire._id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      this.questionnaireService.deleteQuestionnaire(result._id).subscribe(
        () => {
          this.data = this.data.filter(Questionnaire => {
            return Questionnaire._id != result._id;
          });
        },
        err => {
          console.log("404", err);
        }
      );
    });
  }
}
