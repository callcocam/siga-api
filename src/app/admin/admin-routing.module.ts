import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { NotFoundComponent } from './not-found.component';
import { ContentComponent } from './content.component';
import { AuthGuardRouterService } from './auth/services/auth-guard-router.service';
import { AuthQuestRouterService } from './auth/services/auth-quest-router.service';
import { LogoutComponent } from './logout.component';
import { UserComponent } from './user/user.component';
import { EmpresaComponent } from './empresa/empresa.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
          },
          {
            path: 'dashboard',
            component: ContentComponent,
            data: { breadcrumb: 'DashBoard'}
          },
          {
            path: 'empresa',
            component:  EmpresaComponent,            
            canActivate: [AuthGuardRouterService]
          },
          {
            path: 'user',
            component: UserComponent,
            canActivate: [AuthGuardRouterService]
          },
          {
            path: 'sair',
            component: LogoutComponent,
            canActivate: [AuthGuardRouterService]
          }
         
        ],
        canActivate: [AuthGuardRouterService],
        data: { breadcrumb: 'Admin'}
      },
      {
        path: 'admin/auth',
        loadChildren: "./auth/auth.module#AuthModule",
        canActivate: [AuthQuestRouterService]
      },
      { path: '**', component: NotFoundComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
