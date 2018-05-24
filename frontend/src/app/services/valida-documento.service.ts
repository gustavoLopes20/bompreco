import { Injectable } from '@angular/core';

@Injectable()
export class ValidaDocumentoService {

  
  constructor() { }

  private verifica_cpf_cnpj(valor: string): string | boolean {

    valor = valor.replace(/[^0-9]/g, '');

    if (valor.length == 11)
      return 'CPF';
    else if (valor.length == 14)
      return 'CNPJ';
    else
      return false;
  }

  private calc_digitos_posicoes(digitos: any, posicoes: number = 10, soma_digitos: number = 0): string {

    digitos = digitos.toString();

    for (let i = 0; i < digitos.length; i++) {
      soma_digitos = soma_digitos + (digitos[i] * posicoes);
      posicoes--;
      if (posicoes < 2)
        posicoes = 9;
    }
    soma_digitos = soma_digitos % 11;

    if (soma_digitos < 2)
      soma_digitos = 0;
    else
      soma_digitos = 11 - soma_digitos;

    return digitos + soma_digitos; // return cpf
  }

  private valida_cpf(valor: string): boolean {

    valor = valor.replace(/[^0-9]/g, '');

    let digitos: any = valor.substr(0, 9);

    let novo_cpf = this.calc_digitos_posicoes(digitos);
    novo_cpf = this.calc_digitos_posicoes(novo_cpf, 11);

    if (novo_cpf === valor)
      return true;
    else
      return false;
  }

  private valida_cnpj(valor: string): boolean {

    valor = valor.replace(/[^0-9]/g, '');

    let cnpj_original: string = valor;

    let primeiros_numeros_cnpj = valor.substr(0, 12);

    let primeiro_calculo = this.calc_digitos_posicoes(primeiros_numeros_cnpj, 5);

    let segundo_calculo = this.calc_digitos_posicoes(primeiro_calculo, 6);

    let cnpj = segundo_calculo;

    if (cnpj === cnpj_original)
      return true;
    else
      return false;
  }

  public valida_cpf_cnpj(valor: string): boolean {

    let valida: string | boolean = this.verifica_cpf_cnpj(valor);

    valor = valor.replace(/[^0-9]/g, '');

    if (valida === 'CPF')
      return this.valida_cpf(valor);
    else if (valida === 'CNPJ')
      return this.valida_cnpj(valor);
    else
      return false;
  }

  //formatando
  
  public cepFMT(cep: string) : string {// XXXXX-XXX
    cep = cep.replace(/\D/g, "");
    cep = cep.replace(/^(\d{5})(\d)/,"$1-$2"); 
    return cep;
  }

  public cpfFMT(cpf: string) : string  { // XXX.XXX.XXX-XX
    cpf = cpf.replace(/\D/g, "");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return cpf;
  }

  public cnpjFMT(cnpj: string) : string { // XX.XXX.XXX.XXXX-XX
    cnpj = cnpj.replace(/\D/g, "");
    cnpj = cnpj.replace(/^(\d{2})(\d)/,"$1.$2");
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");
    cnpj = cnpj.replace(/\.(\d{3})(\d)/,".$1/$2");
    cnpj = cnpj.replace(/(\d{4})(\d)/,"$1-$2");
    return cnpj;
  }

  public telefoneFMT(tel: string) : string { // (XX) XXXX.XXXX
    tel = tel.replace(/\D/g,"");           
    tel = tel.replace(/^(\d{2})(\d)/g,"($1) $2");
    tel = tel.replace(/(\d)(\d{4})$/,"$1-$2");
    return tel;
  }



}
