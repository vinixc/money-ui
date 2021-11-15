import { DatePipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentoUrl = environment.apiUrl + '/lancamentos';

  constructor(
    private http : HttpClient,
    private datePipe: DatePipe
  ) { }

  relatorioLancamentosPorPessoa(inicio : Date, fim: Date){

    let params = new HttpParams();
    params = params.set('inicio', this.datePipe.transform(inicio,'yyyy-MM-dd')!);
    params = params.set('fim', this.datePipe.transform(fim,'yyyy-MM-dd')!);

    return this.http.get(`${this.lancamentoUrl}/relatorios/por-pessoa`, {params, responseType: 'blob'})
      .toPromise();

  }
}
