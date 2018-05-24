import { Injectable } from '@angular/core';
import { PermissaoUsuario, ISessaoUsuario, IDataRoute, Componente, Permissao } from '../data/dataModels';
import { ApiService } from './api.service';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class PermissoesService {

  private components:Componente[] = [];
  
  constructor(
    private servidor:ApiService,
    private authService:AuthenticationService
  ) { 
  }

  private async getComponents(update:boolean = false) : Promise<Componente[]>{
    if(!this.components.length || update)
      this.components = await this.servidor.chamarApi('api/acesso/Components'); 
    return this.components;
  }

  public async isAllowed(uri: string, permissoesUser:PermissaoUsuario[]) : Promise<boolean> {
    const session:ISessaoUsuario = await this.authService.authenticate();
    if(session.Sucesso){
      const components:Componente[] = await this.getComponents();
      let componentAtual:Componente = components.find(c => c.Uri == uri);
      if (componentAtual && permissoesUser.length) {
        let permissao:PermissaoUsuario = permissoesUser.find(a => a.ComponentId == componentAtual.Id);
        if (permissao)
          return true;
      }
    }
    return false;
  }

  public async permissions(uri: string) : Promise<Permissao>{
    const session:ISessaoUsuario = await this.authService.authenticate();
    if(session.Sucesso){
      const components:Componente[] = await this.getComponents();
      let componentAtual:Componente = components.find(c => c.Uri == uri);
      if (componentAtual) {
        let permissao:PermissaoUsuario = session.PermissoesUser.find(a => a.ComponentId == componentAtual.Id);
        if (permissao)
          return new Permissao(permissao.Consultar,permissao.Incluir, permissao.Editar, permissao.Excluir);     
      }
    }
    return null;
  }

  public filtrarDataSouceRoutes(permissoesUser:PermissaoUsuario[], dataRoute:IDataRoute[]) : IDataRoute[]{
    let filtro:IDataRoute[] = [];
    if(permissoesUser.length){
       filtro = dataRoute.filter(route =>{
          if(permissoesUser.find(p => p.Component.Uri === route.Link))
            return true;
          else
            return false;  
       }); 
    }
    return filtro;
  }

}
