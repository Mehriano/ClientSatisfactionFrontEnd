import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/Services/user.service";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"]
})
export class TeamComponent implements OnInit {
  users;
  constructor(public us: UserService) {}

  ngOnInit() {
    this.us.getRolelessUsers().subscribe(result => {
      this.users = result;
    });
  }
}
