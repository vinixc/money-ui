import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos : any[] = [
    {tipo: 'DESPESA', descricao: 'Compra de Pao', dataVencimento: new Date(2017,6,30), dataPagamento: null, valor: 4.55, pessoa: 'Padaria do José'},
    {tipo: 'RECEITA', descricao: 'Salario', dataVencimento: new Date(2017,6,30), dataPagamento: null, valor: 1094.00, pessoa: 'Joao Pedro'},
    {tipo: 'DESPESA', descricao: 'Roupas', dataVencimento: new Date(2017,6,30), dataPagamento: null, valor: 104.21, pessoa: 'Wesley silva'},
    {tipo: 'DESPESA', descricao: 'Fifa 22', dataVencimento: new Date(2017,6,30), dataPagamento: null, valor: 304.12, pessoa: 'Sergio Nascimento'},
    {tipo: 'DESPESA', descricao: 'Controle PS4', dataVencimento: new Date(2017,6,30), dataPagamento: null, valor: 234.60, pessoa: 'Daniel Alves'},
    {tipo: 'DESPESA', descricao: 'Mercadinho', dataVencimento: new Date(2017,6,30), dataPagamento: null, valor: 14.51, pessoa: 'Messi'}
  ]

}
