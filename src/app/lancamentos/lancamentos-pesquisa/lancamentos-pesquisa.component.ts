import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{

  totalRegistros = 0;
  lancamentos : any[] = []
  filtro = new LancamentoFiltro();

  constructor(
    private lancamentoService : LancamentoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ){

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

  confirmarExclusao(obj : any){
    this.confirmationService.confirm({message: 'Tem certeza que deseja excluir?', accept: () => {
      this.excluir(obj);
    }})
  }

  excluir(obj : any){

    this.lancamentoService.excluir(obj.lancamento.id).then(() => {
       if(obj.table.first === 0){
        this.pesquisar()
     }else{
        obj.table.reset();
     }

     this.messageService.add({severity:'success', detail: 'Lançamento excluido com sucesso!'})
    });
  }
}
