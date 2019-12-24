import { FormBuilder, Validators, NgForm, FormArray } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Questionnaire } from "src/app/models/questionnaire";
import { Router, ActivatedRoute } from "@angular/router";
import { QuestionnaireService } from "src/app/Services/questionnaire.service";
import { Proposition } from "src/app/models/proposition";

@Component({
  selector: "app-questionnaire-add",
  templateUrl: "./questionnaire-add.component.html",
  styleUrls: ["./questionnaire-add.component.scss"]
})
export class QuestionnaireAddComponent implements OnInit {
  questionnaireForm: FormGroup;
  _id: string = "";
  nom: string = "";
  types: string[] = ["Text", "TextArea", "Radio", "CheckBox"];
  isLoadingResults = false;
  questionnaires: Questionnaire[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private questionnaireService: QuestionnaireService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.questionnaireForm = this.formBuilder.group({
      titreQuestioannaire: ["", Validators.required],
      questions: this.formBuilder.array([])
    });
    this.addQuestionFormGroup();
  }
  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    (<any>form).questions.forEach((question, index) => {
      question.ordre = index + 1;
      if ((<Array<Proposition>>question.propositions).length < 2)
        delete (<any>form).questions[index].propositions;
    });
    this.questionnaireService.addQuestionnaire(form).subscribe(
      () => {
        this.isLoadingResults = false;
        this.router.navigate(["/questionnaires"]);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
  addQuestionFormGroup() {
    let quesionFormGroup = this.formBuilder.group({
      titreQuestion: [null, Validators.required],
      type: [null, Validators.required],
      propositions: this.formBuilder.array([])
    });
    (<FormArray>this.questionnaireForm.get("questions")).push(quesionFormGroup);
  }
  addPropositionFormGroup(i: number) {
    let propositionFormGroup = this.formBuilder.group({
      titreProposition: [null, Validators.required],
      alert: [false, Validators.required]
    });
    (<FormArray>(
      (<FormArray>this.questionnaireForm.get("questions"))
        .at(i)
        .get("propositions")
    )).push(propositionFormGroup);
  }
  addQuestionButtonClick() {
    this.addQuestionFormGroup();
  }
  addPropositionFormClick(i) {
    this.addPropositionFormGroup(i);
  }
  removeQuestionButtonClick(i) {
    (<FormArray>this.questionnaireForm.get("questions")).removeAt(i);
  }
  removePropositionButtonClick(i, j) {
    (<FormArray>(
      (<FormArray>this.questionnaireForm.get("questions"))
        .at(i)
        .get("propositions")
    )).removeAt(j);
  }
}
