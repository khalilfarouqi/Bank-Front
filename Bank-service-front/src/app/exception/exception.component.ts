import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exception',
  templateUrl: './exception.component.html',
  styleUrl: './exception.component.css'
})
export class ExceptionComponent {
  @Input() message: string | undefined;

}
