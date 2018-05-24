import { Injectable } from '@angular/core';
import { IEstadoBr, ICidadeBr, Empresa, ISessaoUsuario, Categoria, Componente, EmpresaUsuario, Oferta, IOferta } from '../data/dataModels';
import { ApiService } from './api.service';
import { AuthenticationService } from './authentication.service';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private _estadosBr: Array<IEstadoBr> = [];
  private _cidadesBr: Array<ICidadeBr> = [];
  private _categorias: Array<Categoria> = [];
  private _ofertas: Array<Oferta> = [];
  private _ofertasBuscas: Array<IOferta> = [];
  private _empresas: Array<Empresa> = [];
  private _empresasUsr: Array<EmpresaUsuario> = [];
  
  constructor(
    private servidor: ApiService,
    private authService: AuthenticationService
  ) {
  }

  public isNumber(x: any): x is number {
    return typeof x === "number";
  }
  public isString(x: any): x is string {
    return typeof x === "string";
  }


  public async getEstadosBr(): Promise<IEstadoBr[]> {
    if (!this._estadosBr.length)
      this._estadosBr = await this.servidor.getUri("assets/Data/estadosBr.json");
    return this._estadosBr.slice(0);
  }

  public async getCidadesBr(): Promise<ICidadeBr[]> {
    if (!this._cidadesBr.length)
      this._cidadesBr = await this.servidor.getUri("assets/Data/cidadesBr.json");
    return this._cidadesBr.slice(0);
  }

  public async getCategorias(update: boolean = false): Promise<Categoria[]> {
    if (!this._categorias.length || update)
      this._categorias = await this.servidor.chamarApi("api/Categorias", null);
    return this._categorias.slice(0);
  }

  private async getEmpresasUsr(update: boolean): Promise<EmpresaUsuario[]> {
    if (!this._empresasUsr.length || update)
      this._empresasUsr = await this.servidor.chamarApi("api/EmpresasUsuarios");
    return this._empresasUsr.slice(0);
  }

  public async getEmpresas(update:boolean = false) : Promise<Empresa[]> {
    let empresasUsr: EmpresaUsuario[] = [];
    let aux: Empresa[] = [];
    empresasUsr = await this.getEmpresasUsr(update);
    if (empresasUsr.length) {
      empresasUsr.forEach(e => {
        aux.push(e.Empresa);
      });
    }
    this._empresas = aux;
    return this._empresas;
  }

  public async getOfertas(param:string | number, update:boolean = false) : Promise<any>{
    if(this.isNumber(param)){
      if(!this._ofertas.length || update)
        this._ofertas = await this.servidor.chamarApi("api/Ofertas/Empresa/"+param);
      return this._ofertas;
    }else if(this.isString(param)){
      if(!this._ofertasBuscas.length || update)
        this._ofertasBuscas = await this.servidor.chamarApi("api/Ofertas/Location/"+param);
      return this._ofertasBuscas;
    }
    return null;
  }


  public replaceSpecial(str: string): string {

    str = str.replace(/[ÀÁÂÃ]/, "A");
    str = str.replace(/[àáâã]/, "a");
    str = str.replace(/[ÉÊÈ]/, "E");
    str = str.replace(/[éêè]/, "e");
    str = str.replace(/[Ç]/, "C");
    str = str.replace(/[ç]/, "ç");
    str = str.replace(/[ÓÒÔÕ]/, "O");
    str = str.replace(/[óòôõ]/, "o");

    return str.replace(/[^a-z 0-9]/gi, '');
  }


  public async filterCategorias(keywords: string): Promise<Categoria[]> {
    let categorias: Categoria[] = await this.getCategorias();
    let _filtro: Array<Categoria> = categorias.filter(categoria => {
      if(this.replaceSpecial(categoria.Descricao).match(keywords))
        return true;
      else
        return false;
    });
    return _filtro.slice(0);
  }

  // public async filterCidades(keywords: string): Promise<ICidadeBr[]> {
  //   let cidades: ICidadeBr[] = await this.getCidadesBr();
  //   let _filtro: Array<ICidadeBr> = [];
  //   //cidades.length -> 5564
  //   if(keywords.length < 3){
  //     for(let i = 0; i < 200 && i < cidades.length; i++){
  //         if(this.replaceSpecial(cidades[i].Nome).match(keywords))
  //           _filtro.push(cidades[i]);
  //     } 
  //   }else if(keywords.length < 4){
  //     for(let i = 200; i < 900 && i < cidades.length; i++){
  //       if(this.replaceSpecial(cidades[i].Nome).match(keywords))
  //         _filtro.push(cidades[i]);
  //     } 
  //   }
  //   else if(keywords.length >= 4 && keywords.length <= 8){
  //     for(let i = 900; i < 5564 && i < cidades.length; i++){
  //       if(this.replaceSpecial(cidades[i].Nome).match(keywords))
  //         _filtro.push(cidades[i]);
  //     } 
  //   }
  //   return _filtro.slice(0);
  // }

  public async filterCidades(keywords: string): Promise<ICidadeBr[]> {
    let cidades: ICidadeBr[] = await this.getCidadesBr();
    let _filtro: Array<ICidadeBr> = cidades.filter(cidade => {
      if (this.equals(keywords, cidade.Nome))
        return true;
      else
        return false;
    });
    return _filtro.slice(0);
  }

  private equals(keywords: string, word: string): boolean {
    let found: boolean = false;
    for (let i = 0; i < keywords.length; i++) {
      if (i < keywords.length) {
        if (this.replaceSpecial(keywords[i].toUpperCase()) == this.replaceSpecial(word[i].toUpperCase())) {
          found = true;
        } else {
          found = false;
          break;
        }
      } else {
        found = false;
        break;
      }
    }
    if (found)
      return true;
    else
      return false;
  }

  public getCidadeStorage(): ICidadeBr {
    let localString: string = localStorage.getItem("location");
    if (localString) {
      let obj: ICidadeBr = JSON.parse(localString);
      if (obj)
        return obj;
    }
    return null;
  }

  async getCidadeName(cidade: number): Promise<string> {
    if(!this._cidadesBr.length)
      this._cidadesBr = await this.getCidadesBr();
    if (this._cidadesBr.length && !isNaN(cidade)) {
      let model = this._cidadesBr.find(a => a.Id == cidade);
      if (model)
        return model.Nome;
    }
    return '';
  }

  async getCidadeId(cidade: string): Promise<number> {
    if(!this._cidadesBr.length)
      this._cidadesBr = await this.getCidadesBr();
    if (this._cidadesBr.length) {
      let model = this._cidadesBr.find(a => a.Nome.toUpperCase() == cidade.toUpperCase());
      if (model)
        return model.Id
    }
    return 0;
  }

}



