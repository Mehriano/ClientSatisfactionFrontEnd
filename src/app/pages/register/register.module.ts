import { HttpModule } from '@angular/http';
import { UserService } from './../../Services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from './register.component';

export const routes = [
  { path: '', component: RegisterComponent, pathMatch: 'full' }
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
    RegisterComponent
  ],
  providers: [
    UserService
  ]
})
export class RegisterModule { }