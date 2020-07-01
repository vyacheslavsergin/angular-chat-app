import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {LayoutComponent} from './shared/layouts/layout/layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {ChatPageComponent} from './chat-page/chat-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        component: LoginPageComponent
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'chat',
        component: ChatPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
