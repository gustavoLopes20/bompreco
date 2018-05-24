import { Component, OnInit,  OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() length:number;
  @Output() mudouPage = new EventEmitter<number>();
  
  public pageCont:number = 1;

  constructor() { }

  ngOnInit() {
  }

  prev(){
    if(this.pageCont > 1){
      this.pageCont--;
      this.mudouPage.emit(this.pageCont);
    }
  }

  next(){
    if(this.pageCont < this.length){
      this.pageCont++;
      this.mudouPage.emit(this.pageCont);
    }
  }

}
