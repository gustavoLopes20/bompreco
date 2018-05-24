import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';

import { FiltroOfertasComponent } from './filtro-ofertas/filtro-ofertas.component';
import { BuscasComponent } from './buscas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';
import { AuthenticationService } from '../services/authentication.service';
import { BuscasService } from './buscas.service';
import { LancharErrorComponent } from './lanchar-error/lanchar-error.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import 'hammerjs';

import { DataListComponent } from './data-list/data-list.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { HomeComponent } from './home/home.component';

const rotas: Routes = [
  {
    path: '', component: BuscasComponent, children:[
      { path: '', component: HomeComponent, pathMatch: "full" },
      { path: 'Home', component: HomeComponent },
      { path: 'Ofertas/:cidadeId', component: FiltroOfertasComponent },
      { path: 'Lista-ofertas', component: CarrinhoComponent },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    RouterModule.forChild(rotas)
  ],
  declarations: [
    BuscasComponent,
    FiltroOfertasComponent,
    LancharErrorComponent,
    DataListComponent,
    CarrinhoComponent,
    PaginatorComponent,
    HomeComponent
  ],
  providers:[
    ApiService,
    DataService,
    AuthenticationService,
    BuscasService
  ],
  bootstrap: [BuscasComponent]
})
export class BuscasModule { }
