import { VilleService } from "./../../../Services/ville.service";
import { ZoneService } from "../../../Services/zone.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { ClassGetter } from "@angular/compiler/src/output/output_ast";
import { Ville } from "src/app/models/ville";

@Component({
  selector: "app-zone-edit",
  templateUrl: "./zone-edit.component.html",
  styleUrls: ["./zone-edit.component.scss"]
})
export class ZoneEditComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private zoneService: ZoneService,
    private villeService: VilleService,
    private formBuilder: FormBuilder
  ) {}
  zoneForm: FormGroup;
  _id: string = "";
  nom: string = "";
  isLoadingResults = false;
  villes: Ville[];

  ngOnInit() {
    this.villeService.getVilles().subscribe(result => {
      this.villes = result;
    });
    this.getZone(this.route.snapshot.params["id"]);
    this.zoneForm = this.formBuilder.group({
      nom: [null, Validators.required],
      villeId: [null, Validators.required]
    });
  }
  getZone(id) {
    this.zoneService.getZone(id).subscribe(data => {
      this._id = data._id;
      console.log(this._id);
      this.zoneForm.get("villeId").setValue(data.ville._id, { onlySelf: true });
      this.zoneForm.get("nom").setValue(data.nom);
    });
  }
  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.zoneService.updateZone(this._id, form).subscribe(
      res => {
        let id = res["_id"];
        this.isLoadingResults = false;
        this.router.navigate(["/zones"]);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
