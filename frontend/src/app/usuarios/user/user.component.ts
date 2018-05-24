import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ISessaoUsuario, IDataRoute } from '../../data/dataModels';
import { PermissoesService } from '../../services/permissoes.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

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
  { Descricao: 'Carrinho', Class: 'item-active item', Link: '/Usuarios/User/Carrinho', Iclass: 'fa fa-list' },
  { Descricao: 'Perfil', Class: 'item', Link: '/Usuarios/User/Perfil', Iclass: 'fa fa-user' },
];