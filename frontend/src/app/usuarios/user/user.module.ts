import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import 'hammerjs';

import { PermissoesService } from '../../services/permissoes.service';
import { ValidaDocumentoService } from '../../services/valida-documento.service';
import { DataService } from '../../services/data.service';
import { ApiService } from '../../services/api.service';

import { PerfilComponent } from './perfil/perfil.component';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticationGuardService } from '../../services/authentication-guard.service';
import { UserComponent } from './user.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ResponseComponent } from './response/response.component';

const rotas: Routes = [
  {
    path: '', component: UserComponent, canActivate:[AuthenticationGuardService], canActivateChild:[AuthenticationGuardService], children: [
      { path: 'Perfil', component: PerfilComponent },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressBarModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [
    UserComponent,
    PerfilComponent,
    PaginatorComponent,
    ResponseComponent
  ],
  providers:[
    ApiService,
    AuthenticationService,
    AuthenticationGuardService,
    PermissoesService,
    ValidaDocumentoService,
    DataService
  ],
  bootstrap: [UserComponent]
})
export class UserModule { }
