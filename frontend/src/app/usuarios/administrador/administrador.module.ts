import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import 'hammerjs';

import { OfertasComponent } from './ofertas/ofertas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AdministradorComponent } from './administrador.component';
import { AuthenticationGuardService } from '../../services/authentication-guard.service';
import { ApiService } from '../../services/api.service';
import { AuthenticationService } from '../../services/authentication.service';
import { PermissoesService } from '../../services/permissoes.service';
import { EmpresaComponent } from './empresa/empresa.component';
import { PermissoesComponent } from './permissoes/permissoes.component';
import { ValidaDocumentoService } from '../../services/valida-documento.service';
import { DataService } from '../../services/data.service';
import { DataTableComponent } from './data-table/data-table.component';
import { PaginatorComponent } from './paginator/paginator.component';

const rotas: Routes = [
  {
    path: '', component: AdministradorComponent, canActivate:[AuthenticationGuardService], canActivateChild:[AuthenticationGuardService], children: [
      { path: 'Empresa', component: EmpresaComponent },
      { path: 'Ofertas', component: OfertasComponent },
      { path: 'Permissoes', component: PermissoesComponent },
      { path: 'Perfil', component: PerfilComponent }
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
    MatTooltipModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [
    AdministradorComponent,
    OfertasComponent,
    PerfilComponent,
    EmpresaComponent,
    PermissoesComponent,
    DataTableComponent,
    PaginatorComponent
  ],
  providers:[
    ApiService,
    AuthenticationService,
    AuthenticationGuardService,
    PermissoesService,
    ValidaDocumentoService,
    DataService
  ],
  bootstrap: [AdministradorComponent]
})
export class AdministradorModule { }
