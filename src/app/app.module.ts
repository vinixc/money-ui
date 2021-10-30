import { PessoasService } from './pessoas/pessoas.service';
import { LancamentoService } from './lancamentos/lancamento.service';
import { CoreModule } from './core/core.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { HttpClientModule } from '@angular/common/http';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    LancamentosModule,
    PessoasModule,
    CoreModule,
    HttpClientModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [LancamentoService,PessoasService,MessageService,ConfirmationService, {provide: LOCALE_ID, useValue: 'pt-BR'}],
  bootstrap: [AppComponent],
  exports:[

  ]

})
export class AppModule { }
