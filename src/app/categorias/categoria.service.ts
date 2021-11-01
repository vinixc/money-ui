import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl = 'http://localhost:8080/categorias'
  token = `
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBtb25leWFwaS5jb20uYnIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2NDA4MDAwMTksImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIl0sImp0aSI6IjcwNjcxZTdmLWRkYTUtNDI0OC05YzJmLTc2Y2M0YzdlMDE0YyIsImNsaWVudF9pZCI6ImFuZ3VsYXIifQ.6uVLW6hxZRJ9JgeUoGjy2ONoCamTNLeactDHsQyasj4
  `;

  constructor(
    private http: HttpClient
  ) { }

  listarTodas() : Promise<any>{

    const headers = new HttpHeaders().append('Authorization', `${this.token}`);

    return this.http.get(`${this.categoriaUrl}`,{headers})
      .toPromise()
  }
}
