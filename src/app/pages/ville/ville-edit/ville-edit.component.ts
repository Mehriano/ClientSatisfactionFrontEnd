import { VilleService } from "./../../../Services/ville.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { ClassGetter } from "@angular/compiler/src/output/output_ast";
import { Ville } from "src/app/models/ville";

@Component({
  selector: "app-ville-edit",
  templateUrl: "./ville-edit.component.html",
  styleUrls: ["./ville-edit.component.scss"]
})
export class villeEditComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private villeService: VilleService,
    private formBuilder: FormBuilder
  ) {}
  villeForm: FormGroup;
  _id: string = "";
  nom: string = "";
  isLoadingResults = false;
  villes: Ville[];

  ngOnInit() {
    this.getville(this.route.snapshot.params["id"]);
    this.villeForm = this.formBuilder.group({
      nom: [null, Validators.required]
    });
  }
  getville(id) {
    this.villeService.getVille(id).subscribe(data => {
      this._id = data._id;
      console.log(this._id);
      this.villeForm.get("nom").setValue(data.nom);
    });
    console.log(this._id);
  }
  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.villeService.updateVille(this._id, form).subscribe(
      () => {
        this.isLoadingResults = false;
        this.router.navigate(["/villes"]);
      },
      err => {
        console.log(err);
        this.isLoadingResults = false;
      }
    );
  }
}
