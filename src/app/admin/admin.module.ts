import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { NotFoundComponent } from './not-found.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ContentComponent } from './content.component';
import { SidebarComponent } from './patials/sidebar/sidebar.component';
import { HeaderComponent } from './patials/header/header.component';
import { FooterComponent } from './patials/footer/footer.component';
import { RightBarComponent } from './patials/right-bar/right-bar.component';
import { LogoutComponent } from './logout.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormUploadComponent } from '../components/form-upload/form-upload.component';
import { SharedModule } from './shared.module';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule.forRoot()
  ],
  declarations: [AdminComponent,
     NotFoundComponent,
     ContentComponent,
     SidebarComponent,
     HeaderComponent,
     FooterComponent,
     RightBarComponent,
    LogoutComponent,
    EmpresaComponent,
    UserComponent,
    FormUploadComponent
  ],
  exports: [
    LogoutComponent,
    EmpresaComponent,
    UserComponent,
    FormUploadComponent
  ]
})
export class AdminModule { }
