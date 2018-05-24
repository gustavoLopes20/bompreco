import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lanchar-error',
  templateUrl: './lanchar-error.component.html',
  styleUrls: ['./lanchar-error.component.scss']
})
export class LancharErrorComponent implements OnInit {

  @Input() mensagem: string;
  @Input() active:boolean;

  constructor() { }

  ngOnInit() {
    
  }

  aplicarCss(){
    return{
      'active' : this.active
    }
  }

}
