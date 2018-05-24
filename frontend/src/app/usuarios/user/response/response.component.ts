import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss']
})
export class ResponseComponent implements OnInit {

  @Input() mensagem: string;
  @Input() loading: boolean;

  constructor() { }

  ngOnInit() {
  }

  aplicarCss(option: number) {
    switch (option) {
      case 1:
        return {
          'load' : this.loading
        }
      case 2:
        return {
          'msg' : true,
          'active': !this.loading,
          'load': false
        }
      case 3:
        return {
          'msg' : true,
          'active': this.loading,
          'load': this.loading
        }
      case 4:
        return {
          'active' : this.loading
        }  
    }
  }
}
