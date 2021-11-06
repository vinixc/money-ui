import { environment } from './../../environments/environment';
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

  lancamentoUrl = environment.apiUrl + '/lancamentos';

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  pesquisar(filtro: LancamentoFiltro) : Promise<any>{

    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);
    params = params.set('sort', "id,desc");

    if(filtro.descricao){
      params = params.set('descricao', filtro.descricao);
    }

    if(filtro.dataVencimentoInicio){
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoInicio,'yyyy-MM-dd')!);
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
    }

    return this.http.get(`${this.lancamentoUrl}?resumo`, {params})
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
    return this.http.delete<void>(`${this.lancamentoUrl}/${codigo}`)
    .toPromise();
  }

  adicionar(lancamento : Lancamento) : Promise<Lancamento>{

    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.post<Lancamento>(this.lancamentoUrl, JSON.stringify(lancamento),{headers})
      .toPromise();
  }

  atualizar(lancamento : Lancamento) : Promise<Lancamento>{
    let headers = new HttpHeaders().append('Content-Type', 'application/json');
    return this.http.put<Lancamento>(`${this.lancamentoUrl}/${lancamento.id}`, JSON.stringify(lancamento), {headers})
      .toPromise()
      .then(lancamento =>{
        this.converterStringParaDate([lancamento]);
        return lancamento;
      });
  }

  buscarPorId(id: number) : Promise<Lancamento>{

    return this.http.get<Lancamento>(`${this.lancamentoUrl}/${id}`)
      .toPromise()
      .then(lancamento => {
        this.converterStringParaDate([lancamento]);
        return lancamento;
      })
  }

  private converterStringParaDate(lancamentos: Lancamento[]){

    for(const lancamento of lancamentos){

      let offset = new Date().getTimezoneOffset() * 60000;

      lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento).getTime() + offset);

      if(lancamento.dataPagamento){
        lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);

      }
    }
  }
}
