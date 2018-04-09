import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FlashMessageInterface } from './flash-message.interface';
import { FlashMessage } from './flash-message';
import { FlashMessagesService } from './flash-messages.service';

@Component({
  selector: 'flash-messages',
  templateUrl: './flash-messages.component.html',
  styleUrls: ['./flash-messages.component.css']
})
export class FlashMessagesComponent implements OnInit {


  private _defaults = {
    text: 'default message',
    closeOnClick: true,
    showCloseBtn: true,
    cssClass: ''
};

text: string;
messages: FlashMessageInterface[] = [];
classes: string = '';
_grayOut: boolean = true;

constructor(private _flashMessagesService: FlashMessagesService, private _cdRef: ChangeDetectorRef) {
    this._flashMessagesService.show = this.show.bind(this);
    this._flashMessagesService.grayOut = this.grayOut.bind(this);
}

ngOnInit() {}

show(text?: string, options = {}): void {
    
    let defaults = {
      timeout: 2500,
      closeOnClick: false,
      showCloseBtn: false,
      cssClass: '',
      text: "default message"
    };
    
    for (var attrname in options) { (<any>defaults)[attrname] = (<any>options)[attrname]; }
    
    let message = new FlashMessage(text, defaults.cssClass, defaults.closeOnClick, defaults.showCloseBtn);

    message.timer = window.setTimeout(() => {
        this._remove(message);
        this._cdRef.detectChanges();
    }, defaults.timeout);

    this.messages.push(message);
    this._cdRef.detectChanges();
}

close(message:FlashMessage): void {
        clearTimeout(message.timer);
        this._remove(message);
        this._cdRef.detectChanges();
}

alertClicked(message:FlashMessage): void {
  if(message.closeOnClick){
    this.close(message);
  }
}

grayOut(value = false) {
    this._grayOut = value;
}

private _remove(message: FlashMessageInterface) {
    this.messages = this.messages.filter((msg) => msg.id !== message.id);
}

}