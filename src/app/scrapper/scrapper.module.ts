import {NgModule} from "@angular/core";
import {ScrapperComponent} from "./scrapper.component";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ScrapperComponent,
  ],
  exports: [
    ScrapperComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
})
export class ScrapperModule {
}
