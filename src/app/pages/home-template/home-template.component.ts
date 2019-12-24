import { Settings } from './../../app.settings.model';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar';
import { AppSettings } from 'src/app/app.settings';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-template',
  templateUrl: './home-template.component.html',
  styleUrls: ['./home-template.component.scss']
})
export class HomeTemplateComponent implements OnInit {
  public settings: Settings;
  showmenu = {
    visible1 : true
  };
  title = 'app';
  isprofile=false;
  constructor(private _router:Router , public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
   }

  ngOnInit() {
    //this._router.navigate(['login']);
  }

}
