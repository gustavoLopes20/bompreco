import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ICidadeBr } from '../../data/dataModels';
import { DataService } from '../data.service';

@Injectable()
export class ResolveCidadesGuardService implements Resolve<ICidadeBr[]> {

  constructor(private dataService:DataService) { }

  async resolve() : Promise<ICidadeBr[]>{
    return await this.dataService.getCidadesBr();
  }

}
