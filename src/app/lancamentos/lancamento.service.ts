import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class LancamentoFiltro{
  descricao : string;
  dataVencimentoInicio: Date;
  dataVencimentoFim : Date;

  pagina = 0;
  itensPorPagina = 5;
}


@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentoUrl = 'http://localhost:8080/lancamentos';
  token = `
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBtb25leWFwaS5jb20uYnIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2MzU2Mjk4NjEsImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIl0sImp0aSI6ImM0ZTQ5OGMxLWFkNDctNDdkNC1iYTdjLTk2YzI3YmI5NWQ3NyIsImNsaWVudF9pZCI6ImFuZ3VsYXIifQ.eS1EBBTEKyupod1Kjkace20YoypwpKiAVCHoqpsDPPE
  `;

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  pesquisar(filtro: LancamentoFiltro) : Promise<any>{

    let params = new HttpParams();
    const headers = new HttpHeaders()
    .append('Authorization', `${this.token}`);

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);

    if(filtro.descricao){
      params = params.set('descricao', filtro.descricao);
    }

    if(filtro.dataVencimentoInicio){
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio,'yyyy-MM-dd')!);
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
    }

    return this.http.get(`${this.lancamentoUrl}?resumo`,{headers,params})
      .toPromise()
      .then((response : any) => {
        const lancamentos = response['content'];

        const resultado = {
          lancamentos,
          total : response['totalElements']
        };

        return resultado;
      })

  }

  excluir(codigo: number) : Promise<void>{
    const headers = new HttpHeaders()
    .append('Authorization', `${this.token}`);

    return this.http.delete<void>(`${this.lancamentoUrl}/${codigo}`, {headers})
    .toPromise();
  }
}
