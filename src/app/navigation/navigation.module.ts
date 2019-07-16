import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {HasRoleModule} from "../authentication/has-role/has-role.module";

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HasRoleModule
  ],
  providers: [],
  exports: [
    SidebarComponent,
    NavbarComponent
  ]
})

export class NavigationModule {
}
