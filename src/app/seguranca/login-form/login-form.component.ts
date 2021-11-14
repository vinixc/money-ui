import { NgForm } from '@angular/forms';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from './../auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {


  constructor(
    private authService : AuthService,
    private errorHandlerService: ErrorHandlerService,
    private router : Router
    ) { }

  ngOnInit(): void {
  }

  login(email : string, senha : string){
    this.authService.login(email,senha)
    .then(() =>{

      this.router.navigate(['/dashboard']);

    })
    .catch(error =>{
      this.errorHandlerService.handle(error);
    });

  }

}
