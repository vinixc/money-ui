import { AuthService } from './../../seguranca/auth.service';
import { Pessoa } from './../../core/model';
import { PessoasService } from './../pessoas.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

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
    private errorHandlerService: ErrorHandlerService,
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    public auth : AuthService
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Nova Pessoa');
    this.carregaAlteracao();
  }

  salvar(form : NgForm){
    if(this.pessoa.id){
      this.alterarPessoa(form);
    }else{
      this.adicionarPessoa(form);
    }

  }

  adicionarPessoa(form : NgForm){
    this.pessoaService.adicionar(this.pessoa)
      .then((pessoa) =>{

        this.messageService.add({severity:'success', detail: 'Pessoa adicionada com sucesso!'});

        //form.reset();
        //this.pessoa = new Pessoa();
        this.router.navigate(['/pessoas',pessoa.id])

      })
      .catch(erro =>{
        this.errorHandlerService.handle(erro);
      })
  }

  alterarPessoa(form : NgForm){
    this.pessoaService.alterar(this.pessoa)
      .then(pessoa =>{
        this.pessoa = pessoa;

        this.messageService.add({severity:'success', detail: 'Pessoa atualizada com sucesso!'});
        this.atualizarTituloEdicao();

      })
      .catch(erro => {
        this.errorHandlerService.handle(erro);
      })

  }

  novo(form : NgForm){
    form.reset(new Pessoa);

    this.router.navigate(['pessoas/novo'])

  }

  carregaAlteracao(){

    const id = this.route.snapshot.params['id'];

    if(id){
      this.pessoaService.buscarPorId(id)
        .then(pessoa =>{
          this.pessoa = pessoa;
          this.atualizarTituloEdicao();
        })
        .catch(erro =>{
          this.errorHandlerService.handle(erro);
        })

    }
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Pessoa: ${this.pessoa.nome}`);
  }
}
