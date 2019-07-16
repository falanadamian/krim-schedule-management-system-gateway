import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {appRouting} from "./app.routing";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {NavigationModule} from "./navigation/navigation.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {AuthenticationInterceptor} from "./authentication/authentication.interceptor";
import {ScrapperModule} from "./scrapper/scrapper.module";
import {SharedModule} from "./shared/shared.module";
import {EntityModule} from "./entity/entity.module";
import {MessageModule} from "primeng/message";
import {ToastModule} from "primeng/toast";
import {HasRoleModule} from "./authentication/has-role/has-role.module";
import { HomeComponent } from './home/home.component';
// import {HasRole} from "./authentication/has-role.directive";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // HasRole
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    NavigationModule,
    BrowserAnimationsModule,
    appRouting,
    HttpClientModule,
    ScrapperModule,
    SharedModule,
    EntityModule,
    MessageModule,
    ToastModule,
    HasRoleModule
  ],
  exports: [
    // HasRole
  ],
  providers: [
    AuthenticationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {
}
