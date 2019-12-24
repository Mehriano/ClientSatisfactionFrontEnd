import { MatDialog } from "@angular/material";
import { ZoneService } from "../../../Services/zone.service";
import { Component, OnInit, Inject } from "@angular/core";
import { Zone } from "../../../models/zone";
import { DialogDeleteItemDialog } from "src/app/shared/dialog-delete/dialog-delete-item-dialog";

@Component({
  selector: "app-zones",
  templateUrl: "./zones.component.html",
  styleUrls: ["./zones.component.scss"]
})
export class ZonesComponent implements OnInit {
  displayedColumns: string[] = ["zone_nom", "ville_name", "delete"];
  data: Zone[] = [];
  isLoadingResults = true;
  constructor(private zoneService: ZoneService, public dialog: MatDialog) {}

  ngOnInit() {
    this.zoneService.getZones().subscribe(
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
  openDialog(event, zone: Zone): void {
    event.stopPropagation();
    let dialogRef = this.dialog.open(DialogDeleteItemDialog, {
      data: { name: zone.nom, item: "Zone", _id: zone._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed", result);
      this.zoneService.deleteZone(result).subscribe(
        () => {
          this.data = this.data.filter(zone => {
            return zone._id != result._id;
          });
        },
        err => {
          console.log("404", err);
        }
      );
    });
  }
}
