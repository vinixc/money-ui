import { environment } from './../../environments/environment';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cidade, Estado, Pessoa } from '../core/model';

export class PessoaFiltro{
  nome : string;

  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  pessoasUrl =  environment.apiUrl + '/pessoas';
  cidadesUrl = environment.apiUrl + "/cidades";
  estadosUrl = environment.apiUrl + "/estados";

  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  pesquisar(filtro : PessoaFiltro) : Promise<any>{

    let params = new HttpParams();

    params = params.set('page', filtro.pagina);
    params = params.set('size', filtro.itensPorPagina);
    params = params.set('sort', "nome,asc");

    if(filtro.nome){
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`,{params})
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

    return this.http.get(`${this.pessoasUrl}`)
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

  excluir(id : number){
    return this.http.delete<void>(`${this.pessoasUrl}/${id}`)
    .toPromise();
  }

  ativarOrInativar(id: number, ativo : boolean){

    let headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.put<void>(`${this.pessoasUrl}/${id}/ativo`, ativo, {headers})
    .toPromise();
  }

  adicionar(pessoa : Pessoa) : Promise<Pessoa>{

    let headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.post<Pessoa>(this.pessoasUrl, JSON.stringify(pessoa), {headers})
      .toPromise();

  }

  buscarPorId(id : number) : Promise<Pessoa>{

    let headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.get<Pessoa>(`${this.pessoasUrl}/${id}`,{headers})
      .toPromise();
  }

  alterar(pessoa : Pessoa) : Promise<Pessoa>{

    let headers = new HttpHeaders().append('Content-Type', 'application/json');

    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.id}`, JSON.stringify(pessoa), {headers})
      .toPromise();
  }

  listarEstados() : Promise<Estado[]>{
    return this.http.get<Estado[]>(this.estadosUrl)
      .toPromise()
  }

  pesquisarCidades(estadoId: number) : Promise<Cidade[]>{
    let params = new HttpParams();

    params = params.set('estado',estadoId);

    return this.http.get<Cidade[]>(this.cidadesUrl, {params})
      .toPromise()
  }
}
