import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { IDefaultResponse } from '../data/dataModels';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  public formulario:FormGroup;
  public loading: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      Email: [null, [ Validators.required, Validators.email ]],
      NomeUsuario: [null, [ Validators.required, Validators.minLength(3) ]],
      Senha: [null, [ Validators.required, Validators.minLength(8) ]],  
      Csenha: [null, [ Validators.required, Validators.minLength(8) ]],
    });
  }

  //salvando dados
  async onSubmit(event: Event) {
    event.preventDefault();
    this.loading = true;

    if(this.formulario.valid && this.senhaValid()){
      let response:IDefaultResponse = await this.apiService.chamarApi('api/acesso/cadastro', this.formulario.value);

      if (response.Sucesso) {
        alert(response.Mensagem);
        this.router.navigate(['/Login']);
        this.formulario.reset();   
      } else
        alert(response.Mensagem); 
    }else
      alert("Formulario inválido."); 
  
    this.loading = false;
  }

  aplicarLowerCase(str:string){
    str = str.toLowerCase();
    this.formulario.patchValue({ Email: str});
  }

  senhaValid() : boolean {
    if(this.formulario.get('Senha').value === this.formulario.get('Csenha').value)
      return true;
    else
      return false;  
  }
  aplicarCss(campo:string){
    switch(campo){
      case 'Csenha':
      return {
        'pass-invalid': !this.senhaValid()
      }
    }
  }

}
