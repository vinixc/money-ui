import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = "http://localhost:8080/oauth/token"

  constructor(private http: HttpClient) { }

  login(email : string, senha : string) : Promise<void>{

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bGFy');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${email}&password=${senha}&grant_type=password`;


    return this.http.post(this.oauthTokenUrl, body, {headers})
    .toPromise()
    .then(response =>{
      console.log(response);
    })
    .catch(response =>{
      console.log(response);
    })

  }
}
