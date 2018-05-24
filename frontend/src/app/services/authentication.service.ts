import { Injectable } from '@angular/core';
import { ISessaoUsuario } from '../data/dataModels';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable()
export class AuthenticationService {

  private _sessaoUser: ISessaoUsuario = { Sucesso: false};

  constructor(
    private router: Router,
    private servidor: ApiService
  ) {
  }

  public logout(option: number = 0): void {
    switch (option) {
      case 1:
        if (confirm("Deseja realmente sair?")) {
          localStorage.removeItem('access_token');
          this.router.navigate(['/Login']);
        }
        break;
      default:
        localStorage.removeItem('access_token');
    }
  }

  public async authenticate(update: boolean = false): Promise<ISessaoUsuario> {
    let token: string = localStorage.getItem("access_token");
    if (token) {
      if (!this._sessaoUser.Sucesso || this._sessaoUser.Token != token || update) {
        let sec: ISessaoUsuario = await this.servidor.chamarApi('api/acesso/sessoes');
        this._sessaoUser = sec;
      }
    }
    return this._sessaoUser;
  }

  public async getRidUser(): Promise<string> {
    let session = await this.authenticate();
    if (session)
      return session.UserRID;
    else
      return "";
  }

}
