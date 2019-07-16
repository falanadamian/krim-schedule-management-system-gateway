import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {AdditionalHoursConfigComponent} from "./additional-hours-config/additional-hours-config.component";
import {ErrandComponent} from "./errand/errand.component";
import {ClassLimitComponent} from "./class-limit/class-limit.component";
import {LimitConfigComponent} from "./limit-config/limit-config.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {ErrandListComponent} from "./errand/errand-list/errand-list.component";
import {UserComponent} from "./user/user.component";
import {
  DropdownModule,
  InputSwitchModule,
  MessageModule,
  MessageService,
  MultiSelectModule,
  TooltipModule
} from "primeng/primeng";
import {RouterModule} from "@angular/router";
import {SliderModule} from "primeng/slider";
import {CommonsModule} from "../common/commons.module";
import {TableModule} from "primeng/table";
import {ModulesComponent} from "./modules/modules.component";
import {ModuleComponent} from "./modules/module/module.component";
import {ToastModule} from "primeng/toast";
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserConfigComponent } from './user-config/user-config.component';
import { UserConfigListComponent } from './user-config/user-config-list/user-config-list.component';
import { AdditionalHoursConfigListComponent } from './additional-hours-config/additional-hours-config-list/additional-hours-config-list.component';
import { ClassLimitListComponent } from './class-limit/class-limit-list/class-limit-list.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassesListComponent } from './classes/classes-list/classes-list.component';
import { LimitConfigListComponent } from './limit-config/limit-config-list/limit-config-list.component';
import { ModuleGeneralInformationComponent } from './module-general-information/module-general-information.component';
import { ModuleGeneralInformationListComponent } from './module-general-information/module-general-information-list/module-general-information-list.component';
import { UserSignatureComponent } from './user-signature/user-signature.component';
import { UserSignatureListComponent } from './user-signature/user-signature-list/user-signature-list.component';
import { ModuleGeneralInformationListViewComponent } from './module-general-information/module-general-information-list-view/module-general-information-list-view.component';
import { ScheduleListComponent } from './schedule/schedule-list/schedule-list.component';
import { ModuleListViewComponent } from './modules/module-list-view/module-list-view.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserConfigListViewComponent } from './user-config/user-config-list-view/user-config-list-view.component';
import { UserListViewComponent } from './user/user-list-view/user-list-view.component';
import { StudyInfoComponent } from './study-info/study-info.component';
import { ScheduleListViewComponent } from './schedule/schedule-list-view/schedule-list-view.component';
import { UserSignatureListViewComponent } from './user-signature/user-signature-list-view/user-signature-list-view.component';
import { ModuleManagementComponent } from './module-management/module-management.component';
import { ScheduleManagementListComponent } from './schedule-management-list/schedule-management-list.component';

@NgModule({
  declarations: [
    AdditionalHoursConfigComponent,
    ClassLimitComponent,
    LimitConfigComponent,
    ErrandComponent,
    ErrandListComponent,
    ScheduleComponent,
    UserComponent,
    ModulesComponent,
    ModuleComponent,
    UserCreateComponent,
    UserConfigComponent,
    UserConfigListComponent,
    AdditionalHoursConfigListComponent,
    ClassLimitListComponent,
    ClassesComponent,
    ClassesListComponent,
    LimitConfigListComponent,
    ModuleGeneralInformationComponent,
    ModuleGeneralInformationListComponent,
    UserSignatureComponent,
    UserSignatureListComponent,
    ModuleGeneralInformationListViewComponent,
    ScheduleListComponent,
    ModuleListViewComponent,
    UserListComponent,
    UserConfigListViewComponent,
    UserListViewComponent,
    StudyInfoComponent,
    ScheduleListViewComponent,
    UserSignatureListViewComponent,
    ModuleManagementComponent,
    ScheduleManagementListComponent
  ],
  exports: [
    AdditionalHoursConfigComponent,
    ClassLimitComponent,
    LimitConfigComponent,
    ErrandComponent,
    ErrandListComponent,
    ScheduleComponent,
    UserComponent,
    ModulesComponent,
    ModuleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MultiSelectModule,
    RouterModule,
    TableModule,
    SliderModule,
    DropdownModule,
    TooltipModule,
    CommonsModule,
    MessageModule,
    ToastModule,
    InputSwitchModule
  ],
  providers:[
    MessageService
  ]
})
export class EntityModule {
}
