import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { SharedServicesService } from '../../../services/shared-services.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  
  constructor(private localStorage: LocalStorageService,private sharedService: SharedServicesService) { }
  public user;
  ngOnInit() {
        this.user = this.localStorage.getObject(this.localStorage.USER_KEY);
        this.user.cover = this.sharedService.getSrcUrl(this.user.cover);
  }

}
