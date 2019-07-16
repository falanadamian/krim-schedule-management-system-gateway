import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {SignupComponent} from "./signup/signup.component";
import {SigninComponent} from "./signin/signin.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {UserActivationComponent} from "./user-activation/user-activation.component";

export const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path:'reset-password/:resetKey',
    component: ResetPasswordComponent
  },
  {
    path: 'user-activation/:activationCode',
    component: UserActivationComponent
  }
];

export const authenticationRouting: ModuleWithProviders = RouterModule.forChild(routes);
