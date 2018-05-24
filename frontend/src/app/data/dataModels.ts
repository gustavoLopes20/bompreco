//Models

class AppDataObject {
    Id: number = 0;
    RID: string;
    Registro: Date;
    DataUpdate: Date;
    Ativo: boolean;
}

export class CadastroUsuario {
    NomeUsuario: string;
    Email: string;
    Senha: string;
    Csenha: string;
}
export class PermissaoUsuario extends AppDataObject{
    UsuarioId: number;
    Usuario?: Object;
    ComponentId: number;
    Component?: Componente;
    Consultar: boolean;
    Incluir: boolean;
    Editar: boolean;
    Excluir: boolean;
}
export class Categoria extends AppDataObject{
    Descricao:string;
}
export class Imagem extends AppDataObject{
    Title:string;
    Path:string;
    FullPath:string;
}
export class Oferta extends AppDataObject{
    Descricao:string;
    Preco:number;
    CategoriaId:number;
    Validade:Date;
    ValidadeFMT:string;
    EmpresaId:number;
    ImagemId:number;
    Imagem:Imagem;
    Empresa:Empresa;
    Categoria:Categoria;
}
export class Empresa extends AppDataObject {
    NomeFantasia: string;
    RazaoSocial: string;
    CodEmpresa?: string;
    Cnpj: string;
    Cep: string;
    Logradouro: string;
    Num: number;
    Complemento?: string;
    Bairro: string;
    Estado: string;
    Cidade: string;
    Telefone: string;
    Email?: string;
    LstOfertas?:IOferta[];
}
export class EmpresaUsuario extends AppDataObject{
    EmpresaId:number;
    UsuarioId:number;
    NivelAdministrativo:number;
    Empresa?:Empresa;
    Usuario?:object;
}
export class Componente extends AppDataObject{
    Uri:string;
}

export class Permissao {

    Consultar: boolean;
    Incluir: boolean;
    Editar: boolean;
    Excluir: boolean;

    constructor(_consultar:boolean, _incluir:boolean, _editar:boolean, _excluir:boolean){
        this.Consultar = _consultar;
        this.Editar = _editar;
        this.Incluir = _incluir;
        this.Excluir = _excluir;
    }
}
//comunicationModels -- interfaces

export interface IBusca{
    LocationName:string;
    CategoriaName:string;
}
export interface IOferta{
    Descricao:string;
    Preco:number;
    OfertaId:number;
    ImagemId:number;
    CategoriaId:number;
    EmpresaId:number;
    Validade:Date;
    ValidadeFMT:string;
    CategoriaDesc:string;
    EmpresaDesc:string;
    Qtd:number;
    SubTotal:number;
    SubTotalFMT:string;  	
    PrecoFMT:string;
    Carrinho:boolean;	
}
export interface IMidiaResponse{
    Sucesso:boolean;
    Mensagem:string;
    ImgSrc:string;
    ImgId:number;
}
export interface IDefaultResponse {
    Sucesso: boolean;
    Mensagem?: string;
    Retorno?: Object;
}
export interface ILoginResponse {
    UserNivel?: number;
    Sucesso: boolean;
    Mensagem?: string;
    Token?: string;
}
export interface ISessaoUsuario {
    Token?: string;
    Mensagem?: string;
    Sucesso: boolean;
    UserName?: string;
    UserId?: number;
    UserRID?: string;
    UserNivel?: number;
    PermissoesUser?: Array<PermissaoUsuario>;
}
export interface IEstadoBr {
    Id: number;
    Sigla?: string;
    Nome?: string;
}
export interface ICidadeBr {
    Id: number;
    Nome?: string;
    Estado?: number;
}
export interface ICepResponse {
    cep: string;
    logradouro: string;
    complemento?: string;
    bairro: string;
    localidade: string;
    uf: string;
    unidade?: string;
    ibge?: string;
    gia?: string;
}
export interface IDataRoute {
    Descricao: string;
    Link: string;
    Iclass: string;
    Class:string;
    Ativo?: Boolean;
}
