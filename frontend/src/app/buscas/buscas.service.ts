import { Injectable } from '@angular/core';
import { IOferta } from '../data/dataModels';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

declare const Buffer;

@Injectable()
export class BuscasService {

  private _listOfertas: BehaviorSubject<IOferta[]> = new BehaviorSubject(new Array<IOferta>());
  public listOfertas: Observable<IOferta[]> = this._listOfertas.asObservable();

  private _totItems: BehaviorSubject<number> = new BehaviorSubject(0);
  public totItems: Observable<number> = this._totItems.asObservable();

  constructor() {
    this._listOfertas.next(this.getItems());
    this._totItems.next(this._listOfertas.getValue().length);
  }

  public addOfertas(ofertas:IOferta[]){
    this._listOfertas.next(ofertas);
    localStorage.setItem('ItemsCart',this.encode64(ofertas));
    this._totItems.next(this._listOfertas.getValue().length);
  }

  private getItems() : IOferta[]{
    let json:string = localStorage.getItem('ItemsCart');
    if(json){
      return this.decode64(json);
    }
    return [];
  }

  private encode64(value:IOferta[]) : string{
    let json:string = JSON.stringify(value);
    let bufferOne = new Buffer(json);
    return bufferOne.toString('base64');
  }
  private decode64(str64:string) : IOferta[]{
    let b = new Buffer(str64, 'base64');
    let ofertas:IOferta[] = JSON.parse(b.toString());
    return ofertas;
  }


}
