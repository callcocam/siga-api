import { Injectable } from '@angular/core';
import { JwtTokenService } from '../admin/auth/services/jwt-token.service';
import { MEAT_API, MEAT_BASE } from '../app.api';
//declare var AdminLTE: any;

@Injectable()
export class SharedServicesService {
  //public AdminLTE = AdminLTE;
  public email = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  public number = /^[0-9]*$/
  public token;
  public BASE_URL = "http://localhost:8585/";
  constructor(private jwtToken: JwtTokenService) { 
    this.token = jwtToken.token;
    this.selected = this.defaultBindingsStatus[0]
   this.BASE_URL = MEAT_BASE
   //this.AdminLTE.init();
  }
  getToken(){
    return {token:this.token}
  }
 public defaultBindingsStatus = [
    { value: 1, label: 'Ativo' },
    { value: 2, label: 'Inativo' },
    { value: 3, label: 'Lixeira' }
];
public selected;

getSrcUrl(path?){
  return `${this.BASE_URL}${path}`;
}

}
