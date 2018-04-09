import { Injectable } from '@angular/core';
import { ResourcesService } from '../../services/resources.service';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SharedServicesService } from '../../services/shared-services.service';

@Injectable()
export class UploadFileService {

  constructor(private http: HttpClient, private resources: ResourcesService, private shared:SharedServicesService) {}
 
  pushFileToStorage(file: File,rota,parent, assets,empresa): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
 
    formdata.append('empresa', empresa);
    formdata.append('parent', parent);
    formdata.append('assets', assets);
    formdata.append('tipo', 'upload');
    formdata.append('file', file);
    formdata.append('token',this.shared.token);
 
    const req = new HttpRequest('POST', `${this.resources.BASE_URL}${rota}`, formdata, {
      reportProgress: true,
      responseType: 'json'
    });
 
    return this.http.request(req);
  }
 
  getFiles(): Observable<string[]> {
    return this.http.get<string[]>('/getallfiles')
  }

}
