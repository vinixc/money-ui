import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl = environment.apiUrl + '/categorias'

  constructor(
    private http: HttpClient
  ) { }

  listarTodas() : Promise<any>{

    return this.http.get(`${this.categoriaUrl}`)
      .toPromise()
  }
}
