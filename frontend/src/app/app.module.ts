import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes,RouterModule } from '@angular/router';

//angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import 'hammerjs';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ApiService } from './services/api.service';
import { DataService } from './services/data.service';

const rotas: Routes = [
  { path: '', component: LoginComponent, pathMatch: "full" },
  { path: 'Usuarios', loadChildren: 'app/usuarios/usuarios.module#UsuariosModule'}, // Lazy loading -- verificando se o acesso é um usuario
  { path: 'Buscas', loadChildren: 'app/buscas/buscas.module#BuscasModule'}, // Lazy loading
  { path: 'Login', component: LoginComponent },
  { path: 'Cadastro', component: CadastroComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    RouterModule.forRoot(rotas),
    AngularFontAwesomeModule,   
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
