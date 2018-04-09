import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultRequestOptionsService } from './default-request-options.service';
import { JwtTokenService } from '../admin/auth/services/jwt-token.service';
import { SharedServicesService } from './shared-services.service';
import { MEAT_API } from '../app.api';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResourcesService {
  public BASE_URL = "http://localhost:8585/";
  public path = "";
 
  constructor(
    private http: HttpClient,
    private defaultReqOpt: DefaultRequestOptionsService,
    private jwtToken: JwtTokenService,
    private shared: SharedServicesService
  ) {
    this.BASE_URL = MEAT_API;
  }

  getItem(id?: any): Observable<any> {
    let criteria = new SearchCriteria();
   return this.http.get(`${this.BASE_URL}${this.path}/${id}`, this.defaultReqOpt.merge(criteria));
 }

 getList(params?: any): Observable<any> {
   return this.http.get(`${this.BASE_URL}${this.path}`, this.defaultReqOpt.merge(params));
 }

 create(data) {
   let criteria = new SearchCriteria();
   return this.http.post(`${this.BASE_URL}${this.path}`, data, this.defaultReqOpt.merge(criteria));
 }

 update(data, params?) {
   let criteria = new SearchCriteria();
   Object.assign(criteria, params);
   return this.http.put(
     `${this.BASE_URL}${this.path}`,
     data,
     this.defaultReqOpt.merge(criteria)
   );
 }
 updateStatus(data, params?) {
   let criteria = new SearchCriteria();
   Object.assign(criteria, params);
   return this.http.put(
     `${this.BASE_URL}${this.path}?action=status`,
     data,
     this.defaultReqOpt.merge(criteria)
   );
 }
 delete(id: number, params?) {
   let criteria = new SearchCriteria();
   Object.assign(criteria, params);
   return this.http.delete(
     `${this.BASE_URL}${this.path}/${id}`,
     this.defaultReqOpt.merge(criteria)
   );
 }

}
export class SearchCriteria {
  public zfTableItemPerPage: number = 10;
  public zfTableOrder: string = "asc";
  public zfTableColumn: string = "id";
  public zfTablePage: number = 1;
  public rowAction: string = "";
  public zfTableQuickSearch: string = "";
  public valuesState: string = "";
  public start_date: string = "";
  public end_date: string = "";
  public token: string = "";
}