import { AuthService } from './../../seguranca/auth.service';
import { MessageService } from 'primeng/api';
import { LancamentoService } from './../lancamento.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
      descricao : [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      valor : [null, Validators.required],
      pessoa : this.formBuilder.group({
        id : [null, Validators.required],
        nome : [],
        ativo: [],

      }),
      categoria : this.formBuilder.group({
        id : [null, Validators.required],
        nome : []
      }),
      observacao: [],
      anexo : [],
      urlAnexo : []
    });
  }

  validarObrigatoriedade(input : FormControl){
    return (input.value ? null : {obrigatoriedade: true});
  }

  validarTamanhoMinimo(valor : number){
    return (input : FormControl) =>{
      return (!input.value || input.value.length >= valor) ? null : {tamanhoMinimo: {tamanho: valor}};
    }
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
        this.formulario.patchValue(lancamento);
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
          this.formulario.patchValue(lancamento);
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

  get urlUploadAnexo(){
    return this.lancamentoService.urlUploadAnexo();
  }

  get uploadHeaders() {
    return this.lancamentoService.uploadHeaders();
  }

  get nomeAnexo(){
    const nome = this.formulario.get('anexo')?.value;

    if(nome){
      return nome.substring(nome.indexOf('_') + 1, nome.lenght);
    }

    return '';
  }

  aoTerminarUploadAnexo(event : any){
    const anexo = event.originalEvent.body;

    this.formulario.patchValue({
      anexo : anexo.nome,
      urlAnexo: anexo.url
    })
  }

  erroUpload(event : any){
    this.messageService.add({severity:'error', detail: 'Erro ao tentar enviar anexo!'});
  }
}
