import { SegurancaModule } from './seguranca/seguranca.module';
import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    LancamentosModule,
    PessoasModule,
    SegurancaModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule

  ],
  bootstrap: [AppComponent],
  exports:[

  ]

})
export class AppModule { }
