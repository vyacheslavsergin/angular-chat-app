import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {LayoutComponent} from './shared/layouts/layout/layout.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {ChatPageComponent} from './chat-page/chat-page.component';
import {AsideComponent} from './shared/components/aside/aside.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    LayoutComponent,
    LoginPageComponent,
    ChatPageComponent,
    AsideComponent,
    AsideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
