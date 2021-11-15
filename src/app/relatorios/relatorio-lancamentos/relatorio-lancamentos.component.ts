import { MessageService } from 'primeng/api';
import { RelatoriosService } from './../relatorios.service';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

  periodoInicio: Date;
  periodoFim : Date;

  constructor(
    private relatoriosService : RelatoriosService,
    private errorHandlerService: ErrorHandlerService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  gerar(){
    this.relatoriosService.relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);

        this.messageService.add({severity:'success', detail: 'Relatorio gerado com sucesso!'});
      })
      .catch(error => {
        this.errorHandlerService.handle(error);
      });
  }

}
