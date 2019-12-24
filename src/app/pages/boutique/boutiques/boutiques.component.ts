import { MatDialog } from "@angular/material";
import { BoutiqueService } from "../../../Services/boutique.service";
import { Component, OnInit, Inject } from "@angular/core";
import { Boutique } from "../../../models/boutique";
import { DialogDeleteItemDialog } from "src/app/shared/dialog-delete/dialog-delete-item-dialog";

@Component({
  selector: "app-boutiques",
  templateUrl: "./boutiques.component.html",
  styleUrls: ["./boutiques.component.scss"]
})
export class BoutiquesComponent implements OnInit {
  displayedColumns: string[] = ["boutique_nom", "boutique_zone", "delete"];
  data: Boutique[] = [];
  isLoadingResults = true;
  constructor(
    private boutiqueService: BoutiqueService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.boutiqueService.getBoutiques().subscribe(
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
  openDialog(event, boutique: Boutique): void {
    event.stopPropagation();
    let dialogRef = this.dialog.open(DialogDeleteItemDialog, {
      data: { name: boutique.nom, item: "Boutique", _id: boutique._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      this.boutiqueService.deleteBoutique(result).subscribe();
    });
  }
}
