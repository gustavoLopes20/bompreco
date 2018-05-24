import { Injectable } from '@angular/core';
import { ISessaoUsuario, PermissaoUsuario } from '../data/dataModels';
import { AuthenticationService } from './authentication.service';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PermissoesService } from './permissoes.service';

@Injectable()
export class AuthenticationGuardService implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthenticationService,
    private permssoes:PermissoesService,
    private router: Router
  ) {
  
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let session: ISessaoUsuario = await this.authService.authenticate();
    let succss:boolean = false;
    if (session.Sucesso)
      succss = await this.permssoes.isAllowed(state.url, session.PermissoesUser);
    
    if(!succss)
      this.router.navigate(['/Login']);
      
    return succss;
  }

  async canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    let session: ISessaoUsuario = await this.authService.authenticate();
    let succss:boolean = false;
    if (session.Sucesso)
      succss = await this.permssoes.isAllowed(state.url, session.PermissoesUser);
    
    if(!succss)
      this.router.navigate(['/Login']);

    return succss;
  }
}
