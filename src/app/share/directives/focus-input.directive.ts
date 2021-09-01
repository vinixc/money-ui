import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appFocusInput]'
})
export class FocusInputDirective {

  @HostBinding('style.backgroundColor') corDeFundo : string = '';

  @HostListener('focus')
  onFocus(){
    this.corDeFundo = 'silver';
  }

  @HostListener('blur')
  onBlur(){
    this.corDeFundo = 'transparent';
  }

}
