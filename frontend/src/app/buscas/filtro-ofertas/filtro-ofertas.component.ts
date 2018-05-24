import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ICidadeBr, Empresa, Oferta, IOferta, Categoria } from '../../data/dataModels';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BuscasService } from '../buscas.service';

@Component({
  selector: 'filtro-ofertas',
  templateUrl: './filtro-ofertas.component.html',
  styleUrls: ['./filtro-ofertas.component.scss']
})
export class FiltroOfertasComponent implements OnInit {

  private _cidades: Array<ICidadeBr> = [];
  private _listOfertas: IOferta[] = [];
  private _ofertasCart: IOferta[] = [];
  private _locationAnterior: number = 0;
  private clickNav: boolean = false;

  public listOfertas: IOferta[] = [];
  public categorias: Categoria[] = [];
  public menuList: any[] = MENU_ITEMS;

  constructor(
    private dataService: DataService,
    public servidor: ApiService,
    private route: ActivatedRoute,
    private buscasService: BuscasService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async params => {

      let cidadeId: number = params['cidadeId'];
      this.categorias = await this.dataService.getCategorias();
      this.listOfertas = await this.porLocation(cidadeId);

      this.buscasService.listOfertas.subscribe(async ofertas => {
        this._ofertasCart = ofertas;
      });
      this.buscasService.addOfertas(this._ofertasCart);
    });
  }

  changePage(page: number) {

  }

  validNum(oferta: IOferta) {
    if (oferta.Qtd == 0)
      oferta.Qtd = 1;
  }

  decrease(oferta: IOferta) {
    if (oferta.Qtd > 1)
      oferta.Qtd--;
  }
  increase(oferta: IOferta) {
    oferta.Qtd++;
  }

  async porLocation(location: number): Promise<IOferta[]> {
    let city: string = await this.dataService.getCidadeName(location);
    let _filtro: IOferta[] = [];
    if (city) {
      _filtro = await this.dataService.getOfertas(city);
      _filtro.forEach(a => {
        a.PrecoFMT = a.Preco.toString().replace('.', ',');
      });
    }
    this._listOfertas = _filtro.slice(0);
    return _filtro.slice(0);
  }

  porCategoria(categoria: any) {
    let categ: number = -1;
    this.listOfertas = [];
    let aux: IOferta[] = [];

    if (this.dataService.isNumber(categoria))
      categ = categoria;
    else {
      if (categoria === "All")
        categ = 0;
      else {
        let res: Categoria = this.categorias.find(a => a.Descricao === categoria);
        if (res)
          categ = res.Id;
      }
    }

    if (categ != 0) {
      aux = this._listOfertas.filter(a => {
        if (a.CategoriaId == categ)
          return true;
        else
          return false;
      });
    } else
      aux = this._listOfertas.slice(0);
    this.listOfertas = aux;
  }

  addOferta(oferta: IOferta) {
    let i: number = -1;

    if (this._ofertasCart.length)
      i = this._ofertasCart.findIndex(a => a.OfertaId == oferta.OfertaId);

    if (i != -1)
      this._ofertasCart[i] = oferta;
    else
      this._ofertasCart.push(oferta);

    this.buscasService.addOfertas(this._ofertasCart);
  }

  aplicarCss(option: number) {
    switch (option) {
      case 1:
        return {
          'not-found': true,
          'active': !this.listOfertas.length
        }
      case 2:
        return {
          'pages': true,
          'active': this.listOfertas.length
        }
      case 3:
        return {
          'active-nav': this.clickNav
        }
    }
  }
  aplicarCssNav(option: number) {
    switch (option) {
      case 1:
        return {
          'active': this.clickNav
        }
      case 2:
        return {
          'active': !this.clickNav
        }
    }
  }

  onSubmit_keywords() {
    console.log("ok");
  }

  openNav() {
    this.clickNav = !this.clickNav ? true : false;
  }

}
const MENU_ITEMS: any[] = [
  { Descricao: 'All', IconClass: '' },
  { Descricao: 'Alimentos', IconClass: 'fa fa-cutlery' },
  { Descricao: 'Bebidas', IconClass: 'fa fa-glass' },
  { Descricao: 'Carnes', IconClass: '' },
  { Descricao: 'Frios', IconClass: '' },
  { Descricao: 'Frutas', IconClass: '' },
  { Descricao: 'Higiene', IconClass: '' },
  { Descricao: 'Limpeza', IconClass: '' },
  { Descricao: 'Padaria', IconClass: '' },
  { Descricao: 'Outros', IconClass: '' },
];

