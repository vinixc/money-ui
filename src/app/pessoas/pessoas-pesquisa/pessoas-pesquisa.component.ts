import { PessoasService } from './../pessoas.service';
import { Component, OnInit } from '@angular/core';
import { PessoaFiltro } from '../pessoas.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  pessoas : any[] = [];
  filtro = new PessoaFiltro();

  constructor(
    private pessoaService : PessoasService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private errorHandlerService : ErrorHandlerService
    ) { }

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

  confirmarExclusao(obj : any){
    this.confirmationService.confirm({message: 'Tem certeza que deseja excluir?', accept: () => {
      this.excluir(obj);
    }})
  }

  excluir(obj : any){

    this.pessoaService.excluir(obj.pessoa.id).then(res =>{
      if(obj.table.first === 0){
        this.pesquisar()
      }else{
        obj.table.reset();
      }

      this.messageService.add({severity:'success', detail: 'Pessoa excluida com sucesso!'})
    })
    .catch(err =>{
      this.errorHandlerService.handle(err);
    })

  }

}
