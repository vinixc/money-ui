import { LoginFormComponent } from './login-form/login-form.component';
import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";

const routes : Routes = [

  {path: 'login', component: LoginFormComponent},

]

@NgModule({
  imports:[
    RouterModule.forChild(routes)

  ],
  exports:[
    RouterModule

  ]
})
export class SegurancaRoutingModule { }
