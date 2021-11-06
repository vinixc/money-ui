import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  login(email : string, senha : string){
    console.log(email,senha)
    this.authService.login(email,senha);
  }

}
