import {NgModule} from "@angular/core";
import {SignupComponent} from "./signup/signup.component";
import {SigninComponent} from "./signin/signin.component";
import {authenticationRouting} from "./authentication.routing";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {CommonsModule} from "../common/commons.module";
import {UserActivationComponent} from './user-activation/user-activation.component';
import {InputSwitchModule, MessageModule, MessageService, MultiSelectModule} from "primeng/primeng";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    ResetPasswordComponent,
    UserActivationComponent
  ],
  exports: [
    SigninComponent,
    SignupComponent,
    ResetPasswordComponent,
    UserActivationComponent,
    RouterModule,
    HttpClientModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFontAwesomeModule,
    authenticationRouting,
    CommonsModule,
    MultiSelectModule,
    MessageModule,
    ToastModule,
    InputSwitchModule
  ],
  providers: [
    MessageService
  ],
  entryComponents: [
    SigninComponent
  ]
})

export class AuthenticationModule {
}
