import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class PessoaFiltro{
  nome : string;

  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoasService {


  pessoasUrl = 'http://localhost:8080/pessoas';
  token = `
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBtb25leWFwaS5jb20uYnIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2MzU2MjU5MjUsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIl0sImp0aSI6Ijc1ODQ4MGJlLTdkOTktNGM3ZC1hN2E2LThiMzVmMWMxMzkyOCIsImNsaWVudF9pZCI6ImFuZ3VsYXIifQ.MpMGpiZ6j5Zpn74CBsWAjhE08kYH_W5UxjT5QYtnuo8
  `;

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  pesquisar(filtro : PessoaFiltro) : Promise<any>{

    let params = new HttpParams();
    const headers = new HttpHeaders().append('Authorization', `${this.token}`);

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if(filtro.nome){
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`,{headers,params})
      .toPromise()
      .then((response : any) => {
        const pessoas = response['content'];

        const resultado = {
          pessoas,
          total : response['totalElements']
        };

        return resultado;
      })
  }

  listarTodas() : Promise<any> {
    const headers = new HttpHeaders().append('Authorization', `${this.token}`);

    return this.http.get(`${this.pessoasUrl}`,{headers})
      .toPromise()
      .then((response : any) => {
        const pessoas = response['content'];

        const resultado = {
          pessoas,
          total : response['totalElements']
        };

        return resultado;
      })

  }
}
