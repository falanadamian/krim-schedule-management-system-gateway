import {NgModule} from "@angular/core";
import {HasRole} from "./has-role.directive";

@NgModule({
  declarations: [
    HasRole,
  ],
  exports: [
    HasRole,
  ],
  imports: [],
})
export class HasRoleModule {
}
