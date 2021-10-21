import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  aoMudarPagina(event : LazyLoadEvent){
    const pagina = event!.first! / event!.rows!;
    this.mudouDePagina.emit(pagina);
  }
}
