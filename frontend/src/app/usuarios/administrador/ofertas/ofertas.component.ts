import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Oferta, IMidiaResponse, Imagem, IDefaultResponse, Permissao, ISessaoUsuario, Categoria, Empresa } from '../../../data/dataModels';
import { PermissoesService } from '../../../services/permissoes.service';
import { RouterStateSnapshot, Router, RouterState } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent implements OnInit {

  public categorias:Array<Categoria> = [];
  public empresas:Array<Empresa> = [];
  public displayedColumns:string[] = ['Descricao', 'Preço', 'Categoria', 'Empresa', 'Validade', 'Imagem'];
  public dataSource: Array<Oferta> = [];
  private _dataSource: Array<Oferta> = [];

  public formulario1: FormGroup;
  public formulario: FormGroup;
  public model: Oferta;
  public permissao: Permissao;

  public activeImg: boolean = false;
  private _activeTela: boolean = true;
  public loading:boolean = false;
  public editando:boolean = false;
  public session: ISessaoUsuario = { Sucesso: false };

  public totPages:number = 1;

  constructor(
    private permService: PermissoesService,
    public servidor: ApiService,
    private route: Router,
    private formBuilder: FormBuilder,
    private dataService:DataService
  ) { }

  async ngOnInit() {
    this.formulario1 = this.formBuilder.group({
      Descricao: [null],
      DataI: [null],
      DataF: [null],
      EmpresaId: [null]
    });
    this.formulario = this.formBuilder.group({
      Descricao: [{ value: null, disabled: true }, [Validators.minLength(3), Validators.required]],
      Preco: [{ value: null, disabled: true }, [Validators.required, Validators.minLength(3)]],
      CategoriaId: [{ value: null, disabled: true }, Validators.required],
      EmpresaId: [{ value: null, disabled: true }, Validators.required],
      Validade: [{ value: null, disabled: true }, Validators.required],
      Imagem: [{ value: null, disabled: true }, Validators.required]
    });
    this.categorias = await this.dataService.getCategorias();
    this.empresas = await this.dataService.getEmpresas();
    if(this.empresas.length)
      this.formulario1.patchValue({EmpresaId: this.empresas[0].Id});
    this._dataSource = await this.consultar(1);
    this.limitarItems(4);
    await this.checkingPermissoes();
  }

  private limitarItems(limit:number, pageIndex:number = 0){
    if(limit % 2 == 0){
      this.dataSource = [];
      let cont:number = 0;
      for(let i = pageIndex * limit;i < this._dataSource.length && cont < limit;i++, cont++){
        this.dataSource.push(this._dataSource[i]);
      }
      if(this._dataSource.length > limit)
        this.totPages = Math.ceil(this._dataSource.length / limit);
    }
  }

  changePage(pageIndex:number){
    this.limitarItems(4,pageIndex-1);
  }

  async checkingPermissoes() {
    let _routeState: RouterState = this.route.routerState;
    let _state: RouterStateSnapshot = _routeState.snapshot;
    this.permissao = await this.permService.permissions(_state.url);
    if(this.permissao != null)
      this.session.Sucesso = true;
  }

  aplicarCssTela(tela: number) {
    switch (tela) {
      case 1:
        return {
          'tela': true,
          'tela-active': this._activeTela
        }
      case 2:
        return {
          'tela': true,
          'tela-active': !this._activeTela
        }
    }
  }

  aplicarCssBt(bt: number) {
    switch (bt) {
      case 1:
        return {
          'new': true,
          'active-bt': true
        }
      case 2:
        return {
          'save': true,
          'active-bt': !this._activeTela
        }
      case 3:
        return {
          'prev': true,
          'active-bt': !this._activeTela
        }
      case 4:
        return {
          'del': true,
          'active-bt': !this._activeTela && this.permissao.Excluir
        }
    }
  }

  async prev(update:boolean = false) : Promise<void> {
    this.resetItem();
    this._activeTela = true;
    this.aplicarCssTela(1);
    if(update)
      this.dataSource = await this.dataService.getOfertas(this.empresas[0].Id, true);
    this.dataSource = await this.dataService.getOfertas(this.empresas[0].Id);
  }

  newItem() : void {
    this.formulario.reset();
    this.formulario.enable();
    this.model = new Oferta();
    this._activeTela = false;
    this.activeImg = false;
    this.aplicarCssTela(2);
  }

  async saveItem() {
    this.loading = true;
    if (this.formulario.valid || this.editando) {
      this.model.Descricao = this.formulario.get('Descricao').value;
      this.model.Preco = parseFloat(this.formulario.get('Preco').value);
      this.model.EmpresaId = this.formulario.get('EmpresaId').value;
      this.model.CategoriaId = this.formulario.get('CategoriaId').value;
      this.model.Imagem.Title = this.formulario.get('Descricao').value;
      this.model.Validade = this.formulario.get('Validade').value;
      this.model.ValidadeFMT = this.formulario.get('Validade').value;
      const response: IDefaultResponse = await this.servidor.chamarApi('api/Ofertas', this.model);
      if (response.Sucesso) {
        alert(response.Mensagem);
        this.prev(true);
      } else {
        alert("Erro no servidor!");
        console.error("Erro:", response.Mensagem);
      }
    }
    this.loading = false;
    this.editando = false;
  }

  editItem(item: Oferta) {
    this.editando = true;
    this.newItem();
    this.model.Id = item.Id;
    this.formulario.patchValue({Descricao: item.Descricao});
    this.formulario.patchValue({Preco: item.Preco});
    this.formulario.patchValue({CategoriaId: item.CategoriaId});
    this.formulario.patchValue({EmpresaId: item.EmpresaId});
    this.formulario.patchValue({Validade: item.ValidadeFMT});
    this.changeImagem(item.ImagemId, item.Imagem.Path);
  }
  resetItem() {
    this.formulario.reset();
    this.formulario.disable();
    this.activeImg = false;
  }
  delItem(item: Oferta) {

  }

  async fileChange(fileList: FileList) {
    this.loading = true;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData = new FormData();
      formData.append(file.name, file);
      const response: IMidiaResponse = await this.servidor.chamarApi('api/Midia/UploadFiles', formData);
      if(response.Sucesso)
        this.changeImagem(response.ImgId, response.ImgSrc);
    }
  }

  changeImagem(imgId:number, path:string){
    let img: Imagem = new Imagem();
    img.Id = imgId;
    img.Path = path;
    this.model.ImagemId = img.Id;
    this.model.Imagem = img;
    this.activeImg = true;
    this.loading = false;
  }

  async consultar(option:number): Promise<Oferta[]>{
    let ofertas:Oferta[] = [];
    let _filtro:Oferta[] = [];
    switch(option){
      case 1:
        if(this.formulario1.get('EmpresaId').value != "" || this.formulario1.get('Descricao').value != null){
          ofertas = await this.dataService.getOfertas(Number(this.formulario1.get('EmpresaId').value));
          _filtro = ofertas; 
        }
      break;
    }
    return _filtro;
  }
  async onSubmitForm01(event:Event){ 
    event.preventDefault();
    this.dataSource = await this.consultar(1);
  }

}


