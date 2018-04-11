import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { StarterComponent } from './starter/starter/starter.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SharedModule } from './admin/shared.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './admin/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    StarterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AdminModule,    
    AuthModule,
    SharedModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
