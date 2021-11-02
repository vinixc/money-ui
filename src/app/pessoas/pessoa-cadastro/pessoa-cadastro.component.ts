import { Pessoa } from './../../core/model';
import { PessoasService } from './../pessoas.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(
    private pessoaService : PessoasService,
    private messageService: MessageService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  salvar(form : NgForm){
    this.pessoaService.adicionar(this.pessoa)
      .then(() =>{

        this.messageService.add({severity:'success', detail: 'Pessoa adicionada com sucesso!'});

        form.reset();
        this.pessoa = new Pessoa();

      })
      .catch(erro =>{
        this.errorHandlerService.handle(erro);
      })
  }
}
