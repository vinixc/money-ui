import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { LancamentoFiltro } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styles: [
  ]
})
export class LancamentosGridComponent {

  @Input() lancamentos : any[] = [];
  @Input() totalRegistros = 0;
  @Input() filtro = new LancamentoFiltro();

  @Output() mudouDePagina : any = new EventEmitter();
  @Output() excluirLancamento : any = new EventEmitter();

  @ViewChild('tabela') tabela : any;

  aoMudarPagina(event : LazyLoadEvent){
    const pagina = event!.first! / event!.rows!;
    this.mudouDePagina.emit(pagina);
  }

  excluir(lancamento : any){
    const table = this.tabela;
    const obj = {lancamento, table};

    this.excluirLancamento.emit(obj);


  }
}
