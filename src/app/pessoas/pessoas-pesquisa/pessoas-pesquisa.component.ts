import { PessoasService } from './../pessoas.service';
import { Component, OnInit } from '@angular/core';
import { PessoaFiltro } from '../pessoas.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  pessoas : any[] = [];
  filtro = new PessoaFiltro();

  constructor(private pessoaService : PessoasService) { }

  ngOnInit(): void {

  }

  pesquisar(pagina = 0){
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro).then(res => {
      this.pessoas = res.pessoas;
      this.totalRegistros = res.total;
    });
  }

  mudouDePagina(pagina = 0){
    this.pesquisar(pagina);
  }

}
