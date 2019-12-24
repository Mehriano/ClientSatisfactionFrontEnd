import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { QuestionnaireService } from "src/app/Services/questionnaire.service";

@Component({
  selector: "app-submit-num-facture",
  templateUrl: "./submit-num-facture.component.html",
  styleUrls: ["./submit-num-facture.component.scss"]
})
export class SubmitNumFactureComponent implements OnInit {
  numFactureForm: FormGroup;
  numFacture: string = "";
  isLoadingResults = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionnaireService: QuestionnaireService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.numFactureForm = this.formBuilder.group({
      numFacture: [null, Validators.compose([Validators.required])]
    });
  }
  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.questionnaireService
      .getQuestionnaireByNumFacture((<any>form).numFacture)
      .subscribe(
        result => {
          this.isLoadingResults = false;
          this.router.navigate([
            "repQuestionnaire",
            result._id,
            (<any>form).numFacture
          ]);
        },
        err => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
