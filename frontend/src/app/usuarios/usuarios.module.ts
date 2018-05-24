import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UsuariosComponent } from './usuarios.component';
import { AuthenticationGuardService } from '../services/authentication-guard.service';
import { AuthenticationService } from '../services/authentication.service';
import { PermissoesService } from '../services/permissoes.service';

const rotas: Routes = [
  {
    path: '', component: UsuariosComponent, canActivate:[AuthenticationGuardService], children: [
      { path: 'Admin', loadChildren: 'app/usuarios/administrador/administrador.module#AdministradorModule' }, //Lazy loading
      { path: 'User', loadChildren: 'app/usuarios/user/user.module#UserModule' }, //Lazy loading
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [
    UsuariosComponent
  ],
  providers: [AuthenticationGuardService,  AuthenticationService, PermissoesService],
  bootstrap: [UsuariosComponent]
})
export class UsuariosModule { }
