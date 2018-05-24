import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Empresa } from '../../../data/dataModels';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() displayedColumns:string[];
  @Input() dataSource:any[];
  @Input() optionComponent:number;

  @Output() itemAtual = new EventEmitter();

  constructor(public servidor:ApiService) { }

  ngOnInit() {
  }

  editItem(item){
    this.itemAtual.emit(item);
  }

}
