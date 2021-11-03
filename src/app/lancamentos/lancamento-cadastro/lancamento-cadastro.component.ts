import { MessageService } from 'primeng/api';
import { LancamentoService } from './../lancamento.service';
import { NgForm } from '@angular/forms';
import { PessoasService } from './../../pessoas/pessoas.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { Lancamento } from 'src/app/core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {


  tipos = [
    {label: 'Receita', value:'RECEITA'},
    {label: 'Despesa', value:'DESPESA'}
  ];

  categorias = [
    {label:'Alimentação', value:1},
    {label:'Transporte', value:2}
  ];

  pessoas = [
    {label:'Vinicius de Carvalho', value: 1},
    {label:'Yasmin de Carvalho', value: 2}
  ];

  lancamento = new Lancamento();

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private categoriasService : CategoriaService,
    private pessoaService: PessoasService,
    private lancamentoService : LancamentoService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Novo Lançamento');

    this.carregaAlteracao();
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias(){
    return this.categoriasService.listarTodas().then(categorias =>{
      this.categorias = categorias.map((c: any) => {
        return {label: c.nome, value: c.id};
      });
    })
    .catch(erro =>{
      this.errorHandlerService.handle(erro);
    })
  }

  carregarPessoas(){
    return this.pessoaService.listarTodas().then(res =>{
      this.pessoas = res.pessoas.map((p : any) => ({label: p.nome, value: p.id}))

    }).catch(err => {
      this.errorHandlerService.handle(err);
    })

  }

  salvar(form : NgForm){
    if(this.lancamento.id){
      this.atualizarLancamento(form);
    }else{
      this.adicionarLancamento(form);
    }
  }

  adicionarLancamento(form : NgForm){

    this.lancamentoService.adicionar(this.lancamento)
      .then((lancamentoAdd) => {

        this.messageService.add({severity:'success', detail: 'Lançamento adicionado com sucesso!'});

        //form.reset();
        //this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos',lancamentoAdd.id])

      })
      .catch(erro =>{
        this.errorHandlerService.handle(erro);
      })
  }

  atualizarLancamento(form : NgForm){
    this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento => {
        this.lancamento = lancamento;

        this.messageService.add({severity:'success', detail: 'Lançamento atualizado com sucesso!'});
        this.atualizarTituloEdicao();
      })
      .catch(erro =>{
        this.errorHandlerService.handle(erro);
      });

  }

  carregaAlteracao(){

    const id = this.route.snapshot.params['id'];

    if(id){

      this.lancamentoService.buscarPorId(id)
        .then(lancamento =>{
          this.lancamento = lancamento;
          this.atualizarTituloEdicao();
        })
        .catch(erro =>{
          this.errorHandlerService.handle(erro);
        });
    }

  }

  novo(form : NgForm){
    form.reset(new Lancamento);

    this.router.navigate(['lancamentos/novo'])
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Lancamento: ${this.lancamento.descricao}`);
  }
}
