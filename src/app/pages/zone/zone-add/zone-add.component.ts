import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ZoneService } from "src/app/Services/zone.service";
import { VilleService } from "src/app/Services/ville.service";
import { Ville } from "src/app/models/ville";
import { UserService } from "src/app/Services/user.service";

@Component({
  selector: "app-zone-add",
  templateUrl: "./zone-add.component.html",
  styleUrls: ["./zone-add.component.scss"]
})
export class ZoneAddComponent implements OnInit {
  zoneForm: FormGroup;
  _id: string = "";
  nom: string = "";
  isLoadingResults = false;
  villes: Ville[];
  responsbales: any[];
  constructor(
    private router: Router,
    private zoneService: ZoneService,
    private villeService: VilleService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.villeService.getVilles().subscribe(result => {
      this.villes = result;
    });
    this.userService.getRolelessUsers().subscribe(result => {
      this.responsbales = result;
    });

    this.zoneForm = this.formBuilder.group({
      nom: [null, Validators.required],
      villeId: [null, Validators.required],
      responsableId: [null]
    });
  }
  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
if (!(<any>form).responsableId) delete (<any>form).responsableId;
    this.zoneService.addZone(form).subscribe(
      () => {
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
