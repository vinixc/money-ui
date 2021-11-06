import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = "http://localhost:8080/oauth/token"
  jwtPayload : any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.carregarToken();
   }

  login(email : string, senha : string) : Promise<void>{

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bGFy');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${email}&password=${senha}&grant_type=password`;


    return this.http.post(this.oauthTokenUrl, body, {headers})
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
}