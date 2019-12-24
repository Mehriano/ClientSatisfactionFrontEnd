import { MatDialog } from "@angular/material";
import { VilleService } from "../../../Services/ville.service";
import { Component, OnInit, Inject } from "@angular/core";
import { Ville } from "../../../models/Ville";
import { DialogDeleteItemDialog } from "src/app/shared/dialog-delete/dialog-delete-item-dialog";

@Component({
  selector: "app-Villes",
  templateUrl: "./villes.component.html",
  styleUrls: ["./villes.component.scss"]
})
export class VillesComponent implements OnInit {
  displayedColumns: string[] = ["ville_nom", "delete"];
  data: Ville[] = [];
  isLoadingResults = true;
  constructor(private villeService: VilleService, public dialog: MatDialog) {}

  ngOnInit() {
    this.villeService.getVilles().subscribe(
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
  openDialog(event, Ville: Ville): void {
    event.stopPropagation();
    let dialogRef = this.dialog.open(DialogDeleteItemDialog, {
      data: { name: Ville.nom, item: "Ville", _id: Ville._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      this.villeService.deleteVille(result._id).subscribe(
        () => {
          this.data = this.data.filter(ville => {
            return ville._id != result._id;
          });
        },
        err => {
          console.log("404", err);
        }
      );
    });
  }
}
