import { UserService } from "./../../../Services/user.service";
import { ZoneService } from "../../../Services/zone.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";

import { Zone } from "src/app/models/zone";
import { BoutiqueService } from "src/app/Services/boutique.service";
import { QuestionnaireService } from "src/app/Services/questionnaire.service";

@Component({
  selector: "app-boutique-edit",
  templateUrl: "./boutique-edit.component.html",
  styleUrls: ["./boutique-edit.component.scss"]
})
export class BoutiqueEditComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private zoneService: ZoneService,
    private boutiqueService: BoutiqueService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private questionnaireService: QuestionnaireService
  ) {}
  boutiqueForm: FormGroup;
  _id: string = "";
  isLoadingResults = false;
  zones: Zone[];
  responsbales: any[];
  questionnaires: any[];

  ngOnInit() {
    this.zoneService.getZones().subscribe(result => {
      this.zones = result;
    });
    this.userService.getRolelessUsers().subscribe(result => {
      this.responsbales = result;
    });
    this.questionnaireService.getQuestionnaires().subscribe(result => {
      this.questionnaires = result;
    });
    this.getBoutique(this.route.snapshot.params["id"]);
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
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      questionnaireId: []
    });
  }
  getBoutique(id) {
    this.boutiqueService.getBoutique(id).subscribe(data => {
      this._id = data._id;
      console.log(this._id);
      this.boutiqueForm
        .get("zoneId")
        .setValue(data.zone._id, { onlySelf: true });
      this.boutiqueForm.get("nom").setValue(data.nom);
      if (data.responsable)
        this.boutiqueForm
          .get("responsableId")
          .setValue(data.responsable, { onlySelf: true });
      this.boutiqueForm.get("uuid").setValue(data.uuid);
      this.boutiqueForm.get("lieu").setValue(data.lieu);
    });
  }
  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    if (!(<any>form).responsableId) delete (<any>form).responsableId;
    if (!(<any>form).questionnaireId) delete (<any>form).questionnaireId;
    this.boutiqueService
      .updateBoutique(this.route.snapshot.params["id"], form)
      .subscribe(
        () => {
          // let id = res["_id"];
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
