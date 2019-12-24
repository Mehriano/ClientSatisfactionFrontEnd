import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { VilleService } from "src/app/Services/ville.service";
import { Ville } from "src/app/models/ville";

@Component({
  selector: "app-ville-add",
  templateUrl: "./ville-add.component.html",
  styleUrls: ["./ville-add.component.scss"]
})
export class VilleAddComponent implements OnInit {
  villeForm: FormGroup;
  _id: string = "";
  nom: string = "";
  isLoadingResults = false;
  villes: Ville[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private villeService: VilleService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.villeForm = this.formBuilder.group({
      nom: [null, Validators.required]
    });
  }
  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.villeService.addVille(form).subscribe(
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
