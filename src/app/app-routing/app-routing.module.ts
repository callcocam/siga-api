import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { StarterComponent } from '../starter/starter/starter.component';

@NgModule({imports: [
  RouterModule.forRoot([
    { path: '', redirectTo: 'starter', pathMatch: 'full' },
    { path: 'starter', component: StarterComponent }
  ])
],
declarations: [],
exports: [ RouterModule]
})
export class AppRoutingModule { }
