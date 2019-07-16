import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {ConfirmationModalComponent} from "./confirmation-modal/confirmation-modal.component";
import {CommonModule} from "@angular/common";
import { CommonModalComponent } from './common-modal/common-modal.component';

@NgModule({
  declarations: [
    ConfirmationModalComponent,
    CommonModalComponent,
  ],
  exports: [
    ConfirmationModalComponent,
    CommonModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [

  ]
})
export class CommonsModule {

}
