import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthService } from './../../seguranca/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;

  constructor(
    public auth : AuthService,
    private errorHandler : ErrorHandlerService,
    private router: Router

    ) { }

  ngOnInit(): void {
  }

  novoAccessToken(){
    this.auth.obterNovoAccessToken();
  }

  logout(){
    this.auth.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.errorHandler.handle(error);

      });
  }

}
