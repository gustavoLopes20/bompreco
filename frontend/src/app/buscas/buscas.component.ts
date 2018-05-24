import { Component, OnInit } from '@angular/core';
import { ICidadeBr, ISessaoUsuario, Categoria, IDataRoute, IBusca } from '../data/dataModels';
import { AuthenticationService } from '../services/authentication.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { BuscasService } from './buscas.service';

@Component({
  selector: 'app-buscas',
  templateUrl: './buscas.component.html',
  styleUrls: ['./buscas.component.scss']
})
export class BuscasComponent implements OnInit {

  public model: IBusca = { LocationName: '', CategoriaName: '' };
  public lstCidades: ICidadeBr[] = [];
  public lstCategorias: Categoria[] = [];
  
  public avancado: boolean = false;
  private activeList1: boolean = false;
  private activeList2: boolean = false;

  private clickMenu: boolean = false;
  private clickBtUser: boolean = false;

  private location: number = 0;
  private categoria: number = 0;
  public totItems: number = 0;

  constructor(
    private authService: AuthenticationService,
    private dataService: DataService,
    private router: Router,
    private buscasService: BuscasService
  ) {

    this.buscasService.totItems.subscribe(tot => {
      this.totItems = tot;
    });
    
  }

  ngOnInit() {
    this.router.navigate(['/Buscas/Home']);
  }

  aplicarCss(option: number) {
    switch (option) {
      case 1:
        return {
          'active-lst': this.clickMenu
        }
      case 2:
        return {
          'active-nav': this.clickBtUser
        }
      case 3:
        return {
          'border-none': this.clickBtUser
        }
      case 4:
        return {
          'active': this.totItems > 0
        }
    }
  }

  aplicarCssLst(optionList: number) {
    switch (optionList) {
      case 1:
        return {
          'lst': true,
          'active': this.activeList1
        }
      case 2:
        return {
          'lst': true,
          'active': this.activeList2
        }
    }
  }

  onClickMenu(option: boolean) {
    this.clickMenu = option;
  }

  onClickBtUser(active?: boolean) {
    this.clickBtUser = !this.clickBtUser ? true : false;
    if (typeof active != "undefined")
      this.clickBtUser = active;
  }

  resetModel() {
    this.model = { LocationName: '', CategoriaName: '' };
  }
  
  async onKeyUpCidades(cidade: string) {
    this.lstCidades = await this.dataService.filterCidades(cidade);
    this.activeList1 = this.lstCidades.length ? true : false;
    this.activeList2 = false;
  }

  async filtrarPorCidade(model: ICidadeBr, cidadeId: number = 0) {
    this.onClickMenu(false);
    this.resetModel();
    this.lstCidades = [];
    this.activeList1 = false;
    if (cidadeId != 0) {
      localStorage.setItem("location", cidadeId.toString());
      this.model.LocationName = await this.dataService.getCidadeName(cidadeId);
      this.location = cidadeId;
      this.router.navigate(['/Buscas/Ofertas/'+ this.location]);
    } else {
      this.model.LocationName = model.Nome;
      localStorage.setItem("location", model.Id.toString());
      this.location = model.Id;
      this.router.navigate(['/Buscas/Ofertas/'+ this.location]);
    }
  }

}
