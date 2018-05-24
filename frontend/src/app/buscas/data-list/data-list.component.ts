import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

  @Input() dataSource:any[];
  @Output() itemSeleted = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
  ngOnChanges() {
  }

  clickItem(item:any){
    this.itemSeleted.emit(item);
  }

}
