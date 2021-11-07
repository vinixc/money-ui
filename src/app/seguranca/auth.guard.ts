import { AuthService } from 'src/app/seguranca/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router : Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      //Se nao tiver qualquer uma das permissoes nao deixa continuar.
      if(route.data.roles && !this.auth.temQualquerPermissao(route.data.roles)){

        this.router.navigate(['/nao-autorizado']);

        return false;

      }

    return true;
  }

}
