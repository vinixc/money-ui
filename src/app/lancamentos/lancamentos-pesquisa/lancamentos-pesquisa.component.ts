import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{

  totalRegistros = 0;
  lancamentos : any[] = []
  filtro = new LancamentoFiltro();

  constructor(private lancamentoService : LancamentoService){

  }

  pesquisar(pagina = 0){
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .then(resultado => {
        this.lancamentos = resultado.lancamentos
        this.totalRegistros = resultado.total;
      });
  }

  ngOnInit(): void {
  }

  mudouDePagina(pagina = 0){
    this.pesquisar(pagina);
  }

  excluir(lancamentos : any){
    this.lancamentoService.excluir(lancamentos.id).then(() => {

    });
  }
}
