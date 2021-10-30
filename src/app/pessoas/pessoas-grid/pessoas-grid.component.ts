import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
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

  @Output() mudouDePagina : any = new EventEmitter();

  aoMudarPagina(event : LazyLoadEvent){
    const pagina = event!.first! / event!.rows!;
    this.mudouDePagina.emit(pagina);
  }
}
