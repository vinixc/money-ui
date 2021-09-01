import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import { TableModule } from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';

import { AppComponent } from './app.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { FocusInputDirective } from './share/directives/focus-input.directive';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LancamentosPesquisaComponent,
    NavbarComponent,
    PessoasPesquisaComponent,
    FocusInputDirective,
    LancamentoCadastroComponent

  ],
  imports: [
    BrowserModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    FormsModule,
    InputTextareaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
