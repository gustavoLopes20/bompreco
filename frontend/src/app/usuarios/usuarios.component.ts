import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  constructor(private server:ApiService) {}

  ngOnInit() {
    //let res1 = await this.server.chamarApi("api/Ofertas/Location/Uberlândia");
    //let res2 = await this.server.chamarApi("api/Ofertas/Empresa/5");
    //console.log(res2);
  }

}

