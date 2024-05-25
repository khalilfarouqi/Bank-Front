import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRibFormat]'
})
export class RibFormatDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value']) onInputChange(value: string) {
    value = value.replace(/\s+/g, '').replace(/(\d{3})(\d{3})(\d{16})(\d{2})$/, '$1 $2 $3 $4');
    this.el.nativeElement.value = value; // Set the formatted value back to the input
  }
}
