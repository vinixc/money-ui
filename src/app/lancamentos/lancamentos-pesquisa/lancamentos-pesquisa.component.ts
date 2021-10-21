import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{

  lancamentos : any[] = []
  descricao : string;
  dataVencimentoInicio : Date;
  dataVencimentoFim : Date;


  constructor(private lancamentoService : LancamentoService){

  }

  pesquisar(){
    const filtro : LancamentoFiltro = {
      descricao : this.descricao,
      dataVencimentoFim : this.dataVencimentoFim,
      dataVencimentoInicio : this.dataVencimentoInicio
    };
    console.log(filtro);

    this.lancamentoService.pesquisar(filtro)
      .then(lancamentos => this.lancamentos = lancamentos);
  }

  ngOnInit(): void {
    this.pesquisar();
  }

}
