import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ISessaoUsuario, IDataRoute } from '../../data/dataModels';
import { PermissoesService } from '../../services/permissoes.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  public userSession: ISessaoUsuario = { Sucesso: false };
  public dataSource: IDataRoute[] = [];
  private clickMenu: boolean = false;
  private clickBtUser: boolean = false;
  
  constructor(
    public authService: AuthenticationService,
    private permissoes: PermissoesService
  ) {
  }

  async ngOnInit() {
    this.userSession = await this.authService.authenticate();
    this.dataSource = this.permissoes.filtrarDataSouceRoutes(this.userSession.PermissoesUser, ROUTES);
  }

  onClickMenu(option: boolean) {
    this.clickMenu = option;
  }

  onClickBtUser(active?: boolean) {
    this.clickBtUser = !this.clickBtUser ? true : false;
    if (typeof active != "undefined")
      this.clickBtUser = active;
  }

  exit() {
    this.onClickBtUser();
    this.authService.logout(1);
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
    }
  }

}
const ROUTES: IDataRoute[] = [
  { Descricao: 'Empresa', Class: 'item-active item', Link: '/Usuarios/Admin/Empresa', Iclass: 'fa fa-building-o' },
  { Descricao: 'Ofertas', Class: 'item-active item', Link: '/Usuarios/Admin/Ofertas', Iclass: 'fa fa-shopping-bag' },
  { Descricao: 'Permissoes', Class: 'item-maior item-active item', Link: '/Usuarios/Admin/Permissoes', Iclass: 'fa fa-users' },
  { Descricao: 'Perfil', Class: 'item', Link: '/Usuarios/Admin/Perfil', Iclass: 'fa fa-user' },
];