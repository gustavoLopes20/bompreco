import { Injectable } from '@angular/core';
import { Http, Request, Response, RequestOptionsArgs, Headers, BaseRequestOptions, RequestOptions } from '@angular/http'

import { environment } from '../../environments/environment';

import 'rxjs/Rx';

@Injectable()
export class ApiService {

  constructor(private http: Http) {

  }

  public mapUrl(url: string): string {

    if (!url.startsWith('/')) {
      url = '/' + url;
    }

    let prodUrl = window.location.protocol + '//' + window.location.host;
    let devUrl = 'http://localhost:54142';
    let apiUrl = '';

    if (environment.production) {
      apiUrl = prodUrl;
    } else {
      apiUrl = devUrl;
    }

    url = apiUrl + url;
    return url;
  }

  async chamarApi(api: string, postData?: Object, op2:boolean = false) : Promise<any> {

    let access_token:string = localStorage.getItem('access_token');

    let options: RequestOptionsArgs = {
      url: this.mapUrl(api),
      headers: new Headers({
        'access_token': access_token
      })
    };

    let options2: RequestOptionsArgs = {
      url: this.mapUrl(api),
      headers: new Headers({
        'access_token': access_token,
        'Content-Type': 'multipart/form-data',
        'Accept' : 'application/json'
      })
    };

    if (postData) { 
      options.method = 'POST';
      options.body = postData;

      try {
        let response:any = {};
        if(op2)
          response = await this.http.post(this.mapUrl(api), postData, options2).toPromise();
        else
          response = await this.http.post(this.mapUrl(api), postData, options).toPromise();
        return JSON.parse(response._body);
      } catch (e) {
        return { sucesso:false , mensagem: 'Erro no servidor.'};
      }

    } else {
      options.method = 'GET';

      try {
        const response:any = await this.http.get(this.mapUrl(api), options).toPromise();
        return JSON.parse(response._body);
      } catch (e) {
        return { sucesso: false , mensagem: 'Erro no servidor.'};
      }
    }
  }

  async getUri(uri: string) : Promise<any>{
    try{
      const response: any = await this.http.get(uri).toPromise();
      return JSON.parse(response._body);
    }catch(err){
      return { Sucesso: false, Mensagem: err};
    } 
  }

}
