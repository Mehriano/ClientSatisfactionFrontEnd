import { ReponseService } from "./../../Services/reponse.service";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  NgForm,
  FormControl
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { QuestionnaireService } from "src/app/Services/questionnaire.service";

@Component({
  selector: "app-reponse-questionnaire",
  templateUrl: "./reponse-questionnaire.component.html",
  styleUrls: ["./reponse-questionnaire.component.scss"]
})
export class ReponseQuestionnaireComponent implements OnInit {
  questionnaireRepForme: FormGroup;
  x;
  isLoadingResults: boolean = false;
  public questionnaire;
  questions: any[] = [];
  numFacture = this.route.snapshot.params["numFacture"];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionnaireService: QuestionnaireService,
    private reponseService: ReponseService,
    public formBuilder: FormBuilder
  ) {}

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    (<any>form).reponses.forEach((reponse, i) => {
      if (reponse.propositions) {
        console.log(reponse.propositions);
        console.log(this.questions);
        reponse.propositions.forEach((p, j) => {
          if (p) {
            (<any>form).reponses[i].propositions[j] = this.questions.find(
              question => {
                return question._id == reponse.questionId;
              }
            ).propositions[j]._id;
          }
        });
        reponse.propositions = reponse.propositions.filter(prop => {
          return prop;
        });
      }
    });
    this.reponseService.postResponses(form).subscribe(
      () => {
        this.isLoadingResults = false;
        this.router.navigate(["/home"]);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
  ngOnInit() {
    this.questionnaireRepForme = this.formBuilder.group({
      reponses: this.formBuilder.array([])
    });
    console.log(this.questionnaireRepForme);
    this.questionnaireService
      .getQuestionnaire(this.route.snapshot.params["id"])
      .subscribe(result => {
        console.log(result);
        this.x = (<any>result).titreQuestioannaire;
        let questionFormControle;
        this.questions = result.questions;
        console.log(this.questions);
        this.questions.forEach((element, index) => {
          if (element.type == "CheckBox") {
            questionFormControle = this.formBuilder.group({
              propositions: this.formBuilder.array([]),
              questionId: [element._id],
              numFacture: [this.numFacture]
            });
            element.propositions.forEach(pp => {
              (<FormArray>(
                (<FormArray>questionFormControle.get("propositions"))
              )).push(new FormControl(false));
            });
          } else if (element.type == "Radio") {
            questionFormControle = this.formBuilder.group({
              propositionId: [null, Validators.required],
              questionId: [element._id],
              numFacture: [this.numFacture]
            });
          } else {
            questionFormControle = this.formBuilder.group({
              contenuReponse: [null, Validators.required],
              questionId: [element._id],
              numFacture: [this.numFacture]
            });
          }
          (<FormArray>this.questionnaireRepForme.get("reponses")).push(
            questionFormControle
          );
        });
      });
  }
}
