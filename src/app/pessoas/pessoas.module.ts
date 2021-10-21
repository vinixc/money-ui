import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoasGridComponent } from './pessoas-grid/pessoas-grid.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    PessoasPesquisaComponent,
    PessoaCadastroComponent,
    PessoasGridComponent
  ],
  exports:[
    PessoasPesquisaComponent,
    PessoaCadastroComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    CalendarModule,
    SelectButtonModule,
    DropdownModule,
    InputNumberModule,
    SharedModule
  ]
})
export class PessoasModule { }