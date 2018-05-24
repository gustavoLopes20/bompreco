import { Component, OnInit } from '@angular/core';
import { IOferta } from '../../data/dataModels';
import { BuscasService } from '../buscas.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  private _dataSource: IOferta[] = [];
  public dataSource: IOferta[] = [];
  private hover:boolean = false;
  public valorTotal:string = '0,0';
  private indexHoverAtual:number = -1;
  public totPages:number = 1;
  private _pageIndex:number = 0;

  constructor(
    private buscasService: BuscasService,
    public servidor: ApiService
  ) { }

  ngOnInit() {
    this.buscasService.listOfertas.subscribe(lst=>{
      this._dataSource = lst;
      this.valorTotal = this.calcTot();
      this.limitarItems();
    });
  }

  private limitarItems(limit:number = 4){
    if(limit % 2 == 0){
      this.dataSource = [];
      let cont:number = 0;
      for(let i = this._pageIndex * limit;i < this._dataSource.length && cont < limit;i++, cont++){
        this.dataSource.push(this._dataSource[i]);
      }
      if(this._dataSource.length > limit)
        this.totPages = Math.ceil(this._dataSource.length / limit);
    }
  }
  
  changePage(pageIndex:number){
    this._pageIndex = pageIndex-1;
    this.limitarItems();
  }

  decrease(item:IOferta){
    if(!isNaN(item.Qtd)){
      if(item.Qtd > 1)
        item.Qtd--;
    }else
      item.Qtd = 1;
    this.valorTotal = this.calcTot();
    this.buscasService.addOfertas(this._dataSource);
  }

  increase(item:IOferta){
    if(!isNaN(item.Qtd)){
        item.Qtd++;
    }else
      item.Qtd = 1;
    this.valorTotal = this.calcTot();
    this.buscasService.addOfertas(this._dataSource);
  }

  validaNum(item:IOferta){
    if(isNaN(item.Qtd) || item.Qtd == 0 || item.Qtd == null)
      item.Qtd = 1;
    this.valorTotal = this.calcTot();
    this.buscasService.addOfertas(this._dataSource);
  }

  private calcTot() : string {
    let tot:number = 0;
    this._dataSource.forEach(element => {
        element.PrecoFMT = element.Preco.toString().replace('.',',');
        element.SubTotal = parseFloat((element.Qtd * element.Preco).toFixed(2));
        element.SubTotalFMT = "R$ "+element.SubTotal.toString().replace('.', ',');
        tot += element.SubTotal;
    });
    tot = parseFloat(tot.toFixed(2));
    return "R$ "+tot.toString().replace('.', ',');
  }

  dellItem(item: IOferta) {
    if (confirm("Deseja realmente excluir?")) {
      if (this.dataSource.length) {
        this.dataSource = this.dataSource.filter(data => {
          if (data.OfertaId != item.OfertaId)
            return true;
          else
            return false;
        });
        this.buscasService.addOfertas(this.dataSource);
      }
    }
  }


  aplicarCssActive(){
    return {
      'active': this.dataSource.length
    }
  }

  aplicarCssError(){
    return {
      'lancha-error' : true,
      'active' : !this.dataSource.length
    }
  }

}
