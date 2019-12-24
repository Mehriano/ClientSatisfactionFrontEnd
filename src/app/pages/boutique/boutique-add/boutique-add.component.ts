import { QuestionnaireService } from "src/app/Services/questionnaire.service";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BoutiqueService } from "src/app/Services/boutique.service";
import { ZoneService } from "src/app/Services/zone.service";
import { Zone } from "src/app/models/zone";
import { UserService } from "src/app/Services/user.service";

@Component({
  selector: "app-boutique-add",
  templateUrl: "./boutique-add.component.html",
  styleUrls: ["./boutique-add.component.scss"]
})
export class BoutiqueAddComponent implements OnInit {
  boutiqueForm: FormGroup;
  _id: string = "";
  nom: string = "";
  isLoadingResults = false;
  responsbales: any[];
  questionnaires: any[];

  zones: Zone[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private boutiqueService: BoutiqueService,
    private zoneservice: ZoneService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private questionnaireService: QuestionnaireService
  ) {}

  ngOnInit() {
    this.zoneservice.getZones().subscribe(result => {
      this.zones = result;
      this.userService.getRolelessUsers().subscribe(result => {
        this.responsbales = result;
      });
      this.questionnaireService.getQuestionnaires().subscribe(result => {
        this.questionnaires = result;
      });
    });
    this.boutiqueForm = this.formBuilder.group({
      nom: [null, Validators.required],
      zoneId: [null, Validators.required],
      responsableId: [],
      uuid: [
        null,
        [Validators.required, Validators.min(1000), Validators.max(7000)]
      ],
      lieu: [
        null,
        [Validators.required, Validators.minLength(5), Validators.maxLength(50)]
      ],
      questionnaireId: []
    });
  }
  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    if (!(<any>form).responsableId) delete (<any>form).responsableId;
    if (!(<any>form).questionnaireId) delete (<any>form).questionnaireId;
    (<any>form).uuid = +(<any>form).uuid;
    this.boutiqueService.addBoutique(form).subscribe(
      () => {
        this.isLoadingResults = false;
        this.router.navigate(["/boutiques"]);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
