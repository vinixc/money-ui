import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { AuthService } from 'src/app/seguranca/auth.service';
import { PessoaFiltro } from '../pessoas.service';

@Component({
  selector: 'app-pessoas-grid',
  templateUrl: './pessoas-grid.component.html',
  styles: [
  ]
})
export class PessoasGridComponent {

  @Input() pessoas : any[] = [];

  @Input() lancamentos : any[] = [];
  @Input() totalRegistros = 0;
  @Input() filtro = new PessoaFiltro();

  @ViewChild('tabela') tabela : any;
  @Output() excluirPessoa : any = new EventEmitter();
  @Output() ativarOrInativa : any = new EventEmitter();

  @Output() mudouDePagina : any = new EventEmitter();

  constructor(public auth : AuthService){

  }

  aoMudarPagina(event : LazyLoadEvent){
    const pagina = event!.first! / event!.rows!;
    this.mudouDePagina.emit(pagina);
  }

  excluir(pessoa : any){
    const table = this.tabela;
    const obj = {pessoa, table};

    this.excluirPessoa.emit(obj);
  }

  ativarOrInativar(pessoa : any){
    const table = this.tabela;
    const obj = {pessoa, table};
    this.ativarOrInativa.emit(obj);
  }
}
