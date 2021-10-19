import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface LancamentoFiltro{
  descricao : string;
}


@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentoUrl = 'http://localhost:8080/lancamentos';
  token = `
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBtb25leWFwaS5jb20uYnIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2MzQ2MDUzNzUsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIl0sImp0aSI6IjYyYmJlZTA1LWMwOTMtNGY2MS05MGM0LWRlM2Q3ZmJkZmZjZCIsImNsaWVudF9pZCI6ImFuZ3VsYXIifQ.IUcb_m9amJfpD4slNvt5khwSS0L9eNfrOLxwky-IDHg
  `;

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro) : Promise<any>{

    let params = new HttpParams();
    const headers = new HttpHeaders()
    .append('Authorization', `${this.token}`);

    if(filtro.descricao){
      params = params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.lancamentoUrl}?resumo`,{headers,params})
      .toPromise()
      .then((response : any) => response['content'])

  }
}
