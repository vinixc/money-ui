import { SegurancaModule } from './seguranca/seguranca.module';
import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule,
    LancamentosModule,
    PessoasModule,
    SegurancaModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule

  ],
  bootstrap: [AppComponent],
  exports:[

  ]

})
export class AppModule { }
