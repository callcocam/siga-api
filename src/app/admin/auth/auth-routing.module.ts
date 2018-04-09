import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthQuestRouterService } from './services/auth-quest-router.service';
import { AuthGuardRouterService } from './services/auth-guard-router.service';

@NgModule({
  imports: [
     RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
        canActivate: [AuthQuestRouterService],
        children: [
          {
            path: '',
            redirectTo: 'login',
            pathMatch: 'full'
          },
          {
            path: 'login',
            component: LoginComponent,
            canActivate: [AuthQuestRouterService]
          },
         
        ],
      }    
      
    ])
  ],
  exports:[
    RouterModule
  ]
})
export class AuthRoutingModule { }
