import { UserService } from './../../Services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  public form:FormGroup;
  public settings: Settings;
  constructor(private userService: UserService , public appSettings:AppSettings, public fb: FormBuilder, public router:Router){
    this.settings = this.appSettings.settings; 
    this.form = this.fb.group({
      'nom': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'prenom':[null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'userName':[null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'cin': [null, Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])],
      'phone':[null, Validators.compose([Validators.required, Validators.pattern(/^[0-9]{8}$/)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    },{validator: matchingPasswords('password', 'confirmPassword')});
  }

  ngOnInit() {
    if(this.userService.isLoggedIn()) this.router.navigate(['/']);
  }
  public onSubmit(values:Object):void {
    if (this.form.valid) {
      (<any>values).role = 'None';
      delete  (<any>values).confirmPassword;
      this.userService.signUp(values).subscribe(result => {
        if (result){
          this.userService.login( { email: (<any>values).email , password : (<any>values).password }).subscribe( result => {
            if (result) this.router.navigate(['/']);
          });
          
        }else 
        {
          console.log('error ');
        }
      });
      
    }
  }

  ngAfterViewInit(){
    this.settings.loadingSpinner = false; 
  }
}