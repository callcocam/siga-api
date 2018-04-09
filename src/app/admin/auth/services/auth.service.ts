import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MEAT_API } from '../../../app.api';
import { LocalStorageService } from '../../../services/local-storage.service';
import { HttpClient } from '@angular/common/http';
import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class AuthService {

  public check: Boolean = false;
  public USER_KEY = "user";
  httpOptions;
  public user = {
    name: ""
  };
  public baseUrl = "http://localhost:8585/auth";
  constructor(
    public jwtToken: JwtTokenService,
    private http: HttpClient,
    public localStorage: LocalStorageService
  ) {
    this.baseUrl = MEAT_API
    this.check = this.jwtToken.token ? true : false;
    let userLocalStorage = this.localStorage.getObject(this.USER_KEY);
    this.user = userLocalStorage
      ? userLocalStorage
      : {
          first_name: ""
        };
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}auth`, data);
  }

  
  logout() {
    this.jwtToken.token = null;
    this.check = false;
    this.localStorage.remove(this.USER_KEY);
  }

  private getUser() {
    return this.http.get(
      `${this.baseUrl}auth${
        this.localStorage.getObject(this.USER_KEY).id
      }`
    );
  }

}
