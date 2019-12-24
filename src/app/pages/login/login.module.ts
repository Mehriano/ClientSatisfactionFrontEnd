import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './../../Services/user.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';


export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    HttpModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, 
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    UserService
  ]
})
export class LoginModule { }