import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentoUrl = 'http://localhost:8080/lancamentos';
  token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBtb25leWFwaS5jb20uYnIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2MzQ2MDI4OTUsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIl0sImp0aSI6IjlmMTQ1MWZiLTk1YjEtNDQxNy1iZmJlLTQ0NGM3MjI4ZTIwYSIsImNsaWVudF9pZCI6ImFuZ3VsYXIifQ.kfqJcbkT_CseCzrF3xaxiaytQ0lnfza_Y2POMkE-tWA";


  constructor(private http: HttpClient) { }

  pesquisar() : Promise<any>{

    const headers = new HttpHeaders()
    .append('Authorization', `${this.token}`);

    return this.http.get(`${this.lancamentoUrl}?resumo`,{headers})
      .toPromise()
      .then((response : any) => response['content'])

  }
}
