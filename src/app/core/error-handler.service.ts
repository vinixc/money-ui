import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotAuthenticatedError } from '../seguranca/money-http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessageService,
    private router : Router
  ) { }

  handle(errorResponse  : any){

    let msg : string;

    if(typeof errorResponse === 'string'){
      msg = errorResponse;
    }
    else if(errorResponse instanceof NotAuthenticatedError){
      msg = "Sua sessão expirou!";
      this.router.navigate(['/login']);
    }
     // Pegando todos erros 4XX
    else if(errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400 && errorResponse.status < 500){
      msg = 'Ocorreu um erro ao processar a sua solicitação';




      try{
        msg = errorResponse.error[0]?.mensagemUsuario;
      }catch(e){}

      console.log('Ocorreu um erro ', errorResponse)

      if(errorResponse.status === 403){
        msg = "Você não tem permissão para executar essa ação!";
      }

    }
    else{
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.log('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({severity:'error', detail: msg})


  }
}
