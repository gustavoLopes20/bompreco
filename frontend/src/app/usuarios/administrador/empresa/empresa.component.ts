import { Component, OnInit } from '@angular/core';
import { Empresa, Permissao, ISessaoUsuario, IDefaultResponse, ICidadeBr, IEstadoBr } from '../../../data/dataModels';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PermissoesService } from '../../../services/permissoes.service';
import { ApiService } from '../../../services/api.service';
import { Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { ValidaDocumentoService } from '../../../services/valida-documento.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  public displayedColumns = ['RazaoSocial', 'Cnpj', 'Cidade', 'Estado'];
  public dataSource: Array<Empresa> = [];

  public formulario1: FormGroup;
  public formulario: FormGroup;
  public model: Empresa;

  private btClearFormActive: boolean = false;
  private _activeTela: boolean = true;
  public loading: boolean = false;

  public permissao: Permissao;
  public session: ISessaoUsuario = { Sucesso: false };

  public lstEstados: Array<IEstadoBr> = [];
  public lstCidades: Array<ICidadeBr> = [];
  private _lstCidades: Array<ICidadeBr> = [];

  constructor(
    private permService: PermissoesService,
    private servidor: ApiService,
    private route: Router,
    private formBuilder: FormBuilder,
    private validaDocumentoService: ValidaDocumentoService,
    private dataService: DataService
  ) { }

  async ngOnInit() {
    this.formulario1 = this.formBuilder.group({
      Descricao: [null, Validators.minLength(3)],
      DataI: [null],
      DataF: [null]
    });
    this.formulario = this.formBuilder.group({
      NomeFantasia: [{ value: null, disabled: true }, [Validators.minLength(3), Validators.required]],
      RazaoSocial: [{ value: null, disabled: true }, [Validators.required, Validators.minLength(3)]],
      Cep: [{ value: null, disabled: true }, Validators.required],
      Cnpj: [{ value: null, disabled: true }, [Validators.required, Validators.minLength(3)]],
      Logradouro: [{ value: null, disabled: true }, [Validators.required, Validators.minLength(3)]],
      Num: [{ value: null, disabled: true }, Validators.required],
      Complemento: [{ value: null, disabled: true }],
      Bairro: [{ value: null, disabled: true }, Validators.required],
      Estado: [{ value: null, disabled: true }, Validators.required],
      Cidade: [{ value: null, disabled: true }, Validators.required],
      Telefone: [{ value: null, disabled: true }, Validators.required],
      Email: [{ value: null, disabled: true }]
    });
    this.formulario.valueChanges.subscribe(resp => {
      if (
        (resp.NomeFantasia != null && resp.NomeFantasia.length) ||
        (resp.RazaoSocial != null && resp.RazaoSocial.length) ||
        (resp.Cep != null && resp.Cep.length) ||
        (resp.Cnpj != null && resp.Cnpj.length) ||
        (resp.Logradouro != null && resp.Logradouro.length) ||
        (resp.Num != null) ||
        (resp.Complemento != null && resp.Complemento.length) ||
        (resp.Bairro != null && resp.Bairro.length) ||
        (resp.Estado != null && resp.Estado.length) ||
        (resp.Cidade != null && resp.Cidade.length) ||
        (resp.Telefone != null && resp.Telefone.length) ||
        (resp.Email != null && resp.Email.length)
      )
        this.btClearFormActive = true;
      else
        this.btClearFormActive = false;
    });
    this.lstEstados = await this.dataService.getEstadosBr();
    this._lstCidades = await this.dataService.getCidadesBr();
    this.dataSource = await this.dataService.getEmpresas();
    await this.checkingPermissoes();
  }

  async checkingPermissoes() {
    let _routeState: RouterState = this.route.routerState;
    let _state: RouterStateSnapshot = _routeState.snapshot;
    this.permissao = await this.permService.permissions(_state.url);
    if (this.permissao != null)
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
          'active-bt': this._activeTela
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
      case 5:
        return {
          'clear': true,
          'active-bt': this.btClearFormActive
        }
    }
  }

  async prev(uptade:boolean = false) : Promise<void> {
    this.resetItem();
    this._activeTela = true;
    this.btClearFormActive = false;
    this.aplicarCssTela(1);
    if(uptade)
      this.dataSource = await this.dataService.getEmpresas(true);
    this.dataSource = await this.dataService.getEmpresas();
  } 

  newItem(editando: boolean = false) : void {
    this.formulario.reset();
    if (editando || !this.dataSource.length)
      this.formulario.enable();
    this.model = new Empresa();
    this._activeTela = false;
    this.aplicarCssTela(2);
  }

  async saveItem() : Promise<void> {
    this.loading = true;
    if (this.formulario.valid) {

      this.model.NomeFantasia = this.formulario.get('NomeFantasia').value;
      this.model.RazaoSocial = this.formulario.get('RazaoSocial').value;
      this.model.Cnpj = this.formulario.get('Cnpj').value;
      this.model.Cep = this.formulario.get('Cep').value;
      this.model.Logradouro = this.formulario.get('Logradouro').value;
      this.model.Complemento = this.formulario.get('Complemento').value;
      this.model.Bairro = this.formulario.get('Bairro').value;
      this.model.Estado = this.getEstadoName(this.formulario.get('Estado').value);
      this.model.Cidade = this.getCidadeName(this.formulario.get('Cidade').value);
      this.model.Num = this.formulario.get('Num').value;
      this.model.Telefone = this.formulario.get('Telefone').value;
      this.model.Email = this.formulario.get('Email').value;

      const response: IDefaultResponse = await this.servidor.chamarApi('api/Empresas', this.model);
      if (response.Sucesso) {
        alert(response.Mensagem);
        this.prev(true);
      } else {
        alert("Erro no servidor!");
        console.error("Erro:", response.Mensagem);
      }
    }
    this.loading = false;
  }

  editItem(item: Empresa) {
    this.newItem(true);
    this.model.Id = item.Id;
    this.formulario.setValue({
      NomeFantasia: item.NomeFantasia,
      RazaoSocial: item.RazaoSocial,
      Cnpj: item.Cnpj,
      Logradouro: item.Logradouro,
      Num: item.Num,
      Cep: item.Cep,
      Complemento: item.Complemento,
      Bairro: item.Bairro,
      Estado: this.getEstadoId(item.Estado),
      Cidade: this.getCidadeId(item.Cidade),
      Telefone: item.Telefone,
      Email: item.Email
    });
    this.changeCidades(this.getEstadoId(item.Estado));
  }

  delItem(item: Empresa) : void {

  }

  resetItem() : void {
    this.formulario.reset();
    this.formulario.disable();
  }

  //event onKeyUp - formatando document: CPF ou CNPJ
  formatDoc(value: string) : void {
    this.formulario.patchValue({ Cnpj: this.validaDocumentoService.cnpjFMT(value) });
  }

  //event onChange - carregando cidades
  changeCidades(value: number): void {
    let _filtro: ICidadeBr[] = this._lstCidades.filter(cidade => {
      if (cidade.Estado == value)
        return true;
      else
        return false;
    });
    this.lstCidades = _filtro;
  }

  async buscaCep(str: string) : Promise<void> {
    try {
      this.formulario.patchValue({ Cep: this.validaDocumentoService.cepFMT(str) });
      if (str.length == 9) {
        let cep: number = Number(str.replace(/\D/g, ""));
        if (cep) {
          const resp: any = await this.servidor.getUri("https://viacep.com.br/ws/" + cep + "/json");
          if (resp) {
            let estadoId: number = this.getEstadoId(resp.uf);
            this.formulario.patchValue({ Logradouro: resp.logradouro });
            this.formulario.patchValue({ Bairro: resp.bairro });
            this.formulario.patchValue({ Complemento: resp.complemento });
            this.formulario.patchValue({ Estado: estadoId });
            this.changeCidades(estadoId);
            this.formulario.patchValue({ Cidade: this.getCidadeId(resp.localidade) });
          }
        }
      }
    } catch (err) {
      console.log("Erro:=>", err);
    }
  }

  getCidadeName(cidade: number): string {
    if (this._lstCidades.length) {
      let model = this._lstCidades.find(a => a.Id == cidade);
      if (model)
        return model.Nome;
    }
    return '';
  }

  getCidadeId(cidade: string): number {
    if (this._lstCidades.length) {
      let model = this._lstCidades.find(a => a.Nome.toUpperCase() == cidade.toUpperCase());
      if (model)
        return model.Id
    }
    return 0;
  }

  getEstadoName(estado: number): string {
    if (this.lstEstados.length) {
      let model = this.lstEstados.find(a => a.Id == estado);
      if (model)
        return model.Sigla;
    }
    return '';
  }

  getEstadoId(estado: string): number {
    if (this.lstEstados.length) {
      let model = this.lstEstados.find(a => a.Sigla == estado.toUpperCase());
      if (model)
        return model.Id;
    }
    return 0;
  }

}
