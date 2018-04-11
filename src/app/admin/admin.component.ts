import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from "../services/local-storage.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private closed = true;
  constructor(private localStorage: LocalStorageService) {}
  private user;
  ngOnInit() {
    this.user = this.localStorage.getObject(this.localStorage.USER_KEY);
  }
  public onMenuClose() {
    console.log("menu closed");
  }
  public onMenuOpen() {
    console.log("menu Opened");
  }
  public onOpen($event){
  this.closed = $event
  }
}
