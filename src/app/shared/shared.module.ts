import {NgModule} from "@angular/core";
import {StepComponent} from "./step/step.component";
import {CommonModule} from "@angular/common";
import {StepsModule} from "primeng/steps";
import {ButtonModule} from "primeng/button";
import { StepsComponent } from './steps/steps.component';
import {CommonsModule} from "../common/commons.module";


@NgModule({
  declarations: [
    StepComponent,
    StepsComponent
  ],
  exports: [
    StepComponent,
    StepsComponent
  ],
  imports: [
    CommonModule,
    StepsModule,
    ButtonModule,
    CommonsModule
  ],
})
export class SharedModule {}
