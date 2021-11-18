import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Contato } from 'src/app/core/model';

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

  @Input() contatos : Array<Contato>;
  contato : Contato;
  contatoIndex: number;
  exibindoFormularioContato = false;

  constructor() { }

  ngOnInit(): void {
  }

  inicializarNovoContato(){
    this.contato = new Contato();
    this.exibindoFormularioContato = true;
    this.contatoIndex = this.contatos.length;
  }

  confirmarContato(form : NgForm){
    this.contatos[this.contatoIndex] = this.clonarContato(this.contato);
    this.exibindoFormularioContato = false;
    form.reset();
  }

  clonarContato(contato: Contato) : Contato {
    return new Contato(contato.id, contato.nome, contato.email, contato.telefone);
  }

  prepararEdicaoContato(contato : Contato, index : number){
    this.contato = this.clonarContato(contato);
    this.exibindoFormularioContato = true;
    this.contatoIndex = index;
  }

  removerContato(index : number){
    this.contatos.splice(index,1);
  }

}
