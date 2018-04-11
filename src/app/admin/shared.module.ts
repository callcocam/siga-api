import { NgModule, ModuleWithProviders } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, RouterLink } from "@angular/router";
import { AdminComponent } from './admin.component';
import { NotFoundComponent } from './not-found.component';
import { ContentComponent } from './content.component';
import { AuthService } from './auth/services/auth.service';
import { ResourcesService } from '../services/resources.service';
import { LocalStorageService } from '../services/local-storage.service';
import { SharedServicesService } from '../services/shared-services.service';
import { JwtTokenService } from './auth/services/jwt-token.service';
import { AuthGuardRouterService } from './auth/services/auth-guard-router.service';
import { DefaultRequestOptionsService } from '../services/default-request-options.service';
import { AuthQuestRouterService } from './auth/services/auth-quest-router.service';
import { FlashMessagesService } from '../components/flash-messages/flash-messages.service';
import { UploadFileService } from '../components/form-upload/upload-file.service';
import { FlashMessagesComponent } from '../components/flash-messages/flash-messages.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    FlashMessagesComponent
  ],
  exports:[
     FlashMessagesComponent
  ]
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        ResourcesService,
        LocalStorageService,
        SharedServicesService,
        JwtTokenService,
        AuthGuardRouterService,
        AuthQuestRouterService,
        DefaultRequestOptionsService,
        FlashMessagesService,
        UploadFileService
      ]
    };
  }
}
