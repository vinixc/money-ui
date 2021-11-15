import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  lancamentoUrl = environment.apiUrl + '/lancamentos';

  constructor(private http: HttpClient,private datePipe: DatePipe) { }

  lancamentosPorCategoria() : Promise<Array<any>>{
    return this.http.get(`${this.lancamentoUrl}/estatisticas/por-categoria`)
      .toPromise()
      .then((response : any) => response);
  }

  lancamentosPorDia() : Promise<Array<any>>{
    return this.http.get(`${this.lancamentoUrl}/estatisticas/por-dia`)
      .toPromise()
      .then((response : any) => {
        const dados = response;
        this.converterStringsParaDatas(dados);
        return dados;
      });
  }

  private converterStringsParaDatas(dados: Array<any>) {
    let offset = new Date().getTimezoneOffset() * 60000;

    for (const dado of dados) {
      dado.dia =  new Date(new Date(dado.dia).getTime() + offset);

    }
  }
}
