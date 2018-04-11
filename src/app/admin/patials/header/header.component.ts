import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { LocalStorageService } from "../../../services/local-storage.service";
import { SharedServicesService } from "../../../services/shared-services.service";
import * as _FullScreen from "../../../vendor/scripts";
import * as _Menu from "../../../vendor/menu";
import * as App from "../../../vendor/app"
const document: any = window.document;
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  
  public closed = false;

  @Output() onMenu = new EventEmitter();
  constructor(
    private localStorage: LocalStorageService,
    private sharedService: SharedServicesService
  ) {}

  body: HTMLBodyElement = document.getElementsByTagName("body")[0];
  fullscreenBtn: HTMLBodyElement = document.getElementById("btn-fullscreen");
  public FullScreen = _FullScreen.default.FullScreen;
  public Menu = _Menu.default.Menu;
  public user;
  ngOnInit() {
    App.default._App.init();
    this.user = this.localStorage.getObject(this.localStorage.USER_KEY);
    this.user.cover = this.sharedService.getSrcUrl(this.user.cover);    
  }
  onOpen($event) {
    this.closed = !$event;
    this.onMenu.emit($event);
  }
}
