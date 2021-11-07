import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = environment.apiUrl + '/oauth/token';
  tokenRevokeUrl = environment.apiUrl + '/tokens/revoke';
  jwtPayload : any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.carregarToken();
   }

  login(email : string, senha : string) : Promise<void>{

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bGFy');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${email}&password=${senha}&grant_type=password`;


    return this.http.post(this.oauthTokenUrl, body, {headers, withCredentials: true})
    .toPromise()
    .then((response: any) =>{
      console.log(response);
      this.armazenarToken(response['access_token']);
    })
    .catch(response =>{

      if(response.status === 400){

        if(response['error'].error === 'invalid_grant'){
          return Promise.reject('Usuario ou senha invalida!');
        }

      }

      return Promise.reject(response);

    })

  }

  logout(){
    return this.http.delete(this.tokenRevokeUrl, {withCredentials:true})
      .toPromise()
      .then(() => {
        this.limparAccessToken();
      });
  }

  isAccessTokenInvalido(){
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  limparAccessToken(){
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  private armazenarToken(token : string){
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken (){
    const token = localStorage.getItem('token');

    if(token){
      this.armazenarToken(token);
    }
  }

  obterNovoAccessToken() : Promise<void>{

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bGFy');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = 'grant_type=refresh_token';

    return this.http.post(this.oauthTokenUrl, body, {headers, withCredentials: true})
      .toPromise()
      .then((response : any) =>{
        this.armazenarToken(response['access_token']);

      })
      .catch((response : any) =>{
        console.log("Erro ao renovar novo accessToken", response);
      });
  }

  temPermissao(permissao : string){
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles : any[]){

    for(const role of roles){
      if(this.temPermissao(role)){
        return true;
      }
    }

    return false;
  }
}
