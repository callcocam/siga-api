import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';
import { SharedServicesService } from '../../../services/shared-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private localStorage: LocalStorageService,private sharedService: SharedServicesService) { }
  public user;
  ngOnInit() {
        this.user = this.localStorage.getObject(this.localStorage.USER_KEY);
        this.user.cover = this.sharedService.getSrcUrl(this.user.cover);
  }

}
