import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
  ) { }

  handle(errorResponse  : any){

    let msg : string;

    if(typeof errorResponse === 'string'){
      msg = errorResponse;
    }
     // Pegando todos erros 4XX
    else if(errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400 && errorResponse.status < 500){
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      try{
        msg = errorResponse.error[0]?.mensagemUsuario;
      }catch(e){}

      console.log('Ocorreu um erro ', errorResponse)

    }
    else{
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({severity:'error', detail: msg})


  }
}
