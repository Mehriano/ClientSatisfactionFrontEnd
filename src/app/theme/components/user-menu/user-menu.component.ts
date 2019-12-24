import { Router } from '@angular/router';
import { UserService } from './../../../Services/user.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserMenuComponent implements OnInit {
  public userImage = "assets/img/users/user.jpg";
  constructor(private userService: UserService, public router:Router) { }

  ngOnInit() {
  }
 logout(){
   this.userService.logout();
   this.router.navigate(['/']);

 }
}
