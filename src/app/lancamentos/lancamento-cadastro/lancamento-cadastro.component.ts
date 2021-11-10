import { AuthService } from './../../seguranca/auth.service';
import { MessageService } from 'primeng/api';
import { LancamentoService } from './../lancamento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoasService } from './../../pessoas/pessoas.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Component, OnInit } from '@angular/core';
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

  categorias = [];

  pessoas = [];

  //lancamento = new Lancamento();

  formulario : FormGroup;

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private categoriasService : CategoriaService,
    private pessoaService: PessoasService,
    private lancamentoService : LancamentoService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    public auth : AuthService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
    this.title.setTitle('Novo Lançamento');

    this.carregaAlteracao();
    this.carregarCategorias();
    this.carregarPessoas();
  }

  configurarFormulario(){
    this.formulario = this.formBuilder.group({
      id: [],
      tipo : ['RECEITA', Validators.required],
      dataVencimento : [null, Validators.required],
      dataPagamento : [],
      descricao : [null, [Validators.required, Validators.minLength(5)]],
      valor : [null, Validators.required],
      pessoa : this.formBuilder.group({
        id : [null, Validators.required],
        nome : []
      }),
      categoria : this.formBuilder.group({
        id : [null, Validators.required],
        nome : []
      }),
      observacao: []
    });
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

  salvar(){
    if(this.formulario.get('id')?.value){
      this.atualizarLancamento();
    }else{
      this.adicionarLancamento();
    }
  }

  adicionarLancamento(){

    this.lancamentoService.adicionar(this.formulario.value)
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

  atualizarLancamento(){
    this.lancamentoService.atualizar(this.formulario.value)
      .then(lancamento => {
        //this.lancamento = lancamento;
        this.formulario.setValue(lancamento);
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
          //this.lancamento = lancamento;
          this.formulario.setValue(lancamento);
          this.atualizarTituloEdicao();
        })
        .catch(erro =>{
          this.errorHandlerService.handle(erro);
        });
    }

  }

  novo(){
    this.formulario.reset();
    //form.reset(new Lancamento);

    this.router.navigate(['lancamentos/novo'])
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Lancamento: ${this.formulario.get('descricao')?.value}`);
  }
}
