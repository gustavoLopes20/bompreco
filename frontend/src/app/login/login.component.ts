import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ILoginResponse } from '../data/dataModels';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loading: boolean = false;
  public formulario: FormGroup;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private servidor: ApiService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      Email: [null, [Validators.required, Validators.email]],
      Senha: [null, [Validators.required, Validators.minLength(8)]],
    }); 
  }

  async onSubmit(event: Event) {
    
    event.preventDefault();
    this.loading = true;

    const response:ILoginResponse = await this.servidor.chamarApi('api/acesso/login/', this.formulario.value);

    if (response.Sucesso) {
      localStorage.setItem("access_token", response.Token);
      this.redirectTo(response.UserNivel);
    } else {
      this.loading = false;  
      console.error("Erro ->", response.Mensagem);
      alert(response.Mensagem);
    }
     
  }

  redirectTo(userNivel:number){
    switch(userNivel){
      case 0:
        this.router.navigate(['/Usuarios/User']);
      break;
      case 1:
        this.router.navigate(['/Usuarios/Admin']);
      break;
    }
  }

  aplicarLowerCase(str:string){
    str = str.toLowerCase();
    this.formulario.patchValue({ email: str});
  }

}
 //const r = await this.servidor.chamarApi('api/acesso/PermissoesAdd');
