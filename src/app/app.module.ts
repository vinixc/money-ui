import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    LancamentosModule,
    PessoasModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[

  ]

})
export class AppModule { }
