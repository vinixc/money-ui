import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';

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

  excluir(obj : any){
    this.lancamentoService.excluir(obj.lancamento.id).then(() => {
      console.log(obj.table)
      if(obj.table.first === 0){
        this.pesquisar()
     }else{
       console.log('reset')
       obj.table.reset();
     }
    });
  }
}
