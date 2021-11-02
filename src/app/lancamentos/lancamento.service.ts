import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lancamento } from '../core/model';

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
    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBtb25leWFwaS5jb20uYnIiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwibm9tZSI6IkFkbWluaXN0cmFkb3IiLCJleHAiOjE2NDA4MDAwMTksImF1dGhvcml0aWVzIjpbIlJPTEVfQ0FEQVNUUkFSX0NBVEVHT1JJQSIsIlJPTEVfUEVTUVVJU0FSX1BFU1NPQSIsIlJPTEVfUkVNT1ZFUl9QRVNTT0EiLCJST0xFX0NBREFTVFJBUl9MQU5DQU1FTlRPIiwiUk9MRV9QRVNRVUlTQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUkVNT1ZFUl9MQU5DQU1FTlRPIiwiUk9MRV9DQURBU1RSQVJfUEVTU09BIiwiUk9MRV9QRVNRVUlTQVJfQ0FURUdPUklBIl0sImp0aSI6IjcwNjcxZTdmLWRkYTUtNDI0OC05YzJmLTc2Y2M0YzdlMDE0YyIsImNsaWVudF9pZCI6ImFuZ3VsYXIifQ.6uVLW6hxZRJ9JgeUoGjy2ONoCamTNLeactDHsQyasj4
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

  adicionar(lancamento : Lancamento) : Promise<Lancamento>{

    let headers = new HttpHeaders()
    .append('Authorization', `${this.token}`);
    headers = headers.append('Content-Type', 'application/json');


    return this.http.post<Lancamento>(this.lancamentoUrl, JSON.stringify(lancamento), {headers})
      .toPromise();
  }

  atualizar(lancamento : Lancamento) : Promise<Lancamento>{

    const headers = new HttpHeaders()
    .append('Authorization', `${this.token}`);

    return this.http.put<Lancamento>(`${this.lancamentoUrl}/${lancamento.id}`, JSON.stringify(lancamento), {headers})
      .toPromise()
      .then(lancamento =>{
        this.converterStringParaDate([lancamento]);
        return lancamento;
      });
  }

  buscarPorId(id: number) : Promise<Lancamento>{

    const headers = new HttpHeaders()
    .append('Authorization', `${this.token}`);

    return this.http.get<Lancamento>(`${this.lancamentoUrl}/${id}`, {headers})
      .toPromise()
      .then(lancamento => {
        this.converterStringParaDate([lancamento]);
        return lancamento;
      })
  }

  private converterStringParaDate(lancamentos: Lancamento[]){

    for(const lancamento of lancamentos){

      let offset = new Date().getTimezoneOffset() * 600000;

      lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento).getTime() + offset);

      if(lancamento.dataPagamento){
        lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);

      }
    }
  }
}
