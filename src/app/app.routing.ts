import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from "@angular/core";
import {AdditionalHoursConfigComponent} from "./entity/additional-hours-config/additional-hours-config.component";
import {ClassLimitComponent} from "./entity/class-limit/class-limit.component";
import {LimitConfigComponent} from "./entity/limit-config/limit-config.component";
import {AuthenticationGuard} from "./guard/authentication.guard";
import {ErrandComponent} from "./entity/errand/errand.component";
import {ErrandListComponent} from "./entity/errand/errand-list/errand-list.component";
import {ScheduleComponent} from "./entity/schedule/schedule.component";
import {ModulesComponent} from "./entity/modules/modules.component";
import {ModuleComponent} from "./entity/modules/module/module.component";
import {ScrapperComponent} from "./scrapper/scrapper.component";
import {StepsComponent} from "./shared/steps/steps.component";
import {UserComponent} from "./entity/user/user.component";
import {UserCreateComponent} from "./entity/user/user-create/user-create.component";
import {UserConfigComponent} from "./entity/user-config/user-config.component";
import {UserConfigListComponent} from "./entity/user-config/user-config-list/user-config-list.component";
import {AdditionalHoursConfigListComponent} from "./entity/additional-hours-config/additional-hours-config-list/additional-hours-config-list.component";
import {ClassLimitListComponent} from "./entity/class-limit/class-limit-list/class-limit-list.component";
import {ClassesComponent} from "./entity/classes/classes.component";
import {ClassesListComponent} from "./entity/classes/classes-list/classes-list.component";
import {LimitConfigListComponent} from "./entity/limit-config/limit-config-list/limit-config-list.component";
import {ModuleGeneralInformationListComponent} from "./entity/module-general-information/module-general-information-list/module-general-information-list.component";
import {ModuleGeneralInformationComponent} from "./entity/module-general-information/module-general-information.component";
import {UserSignatureListComponent} from "./entity/user-signature/user-signature-list/user-signature-list.component";
import {UserSignatureComponent} from "./entity/user-signature/user-signature.component";
import {UserListComponent} from "./entity/user/user-list/user-list.component";
import {ModuleManagementComponent} from "./entity/module-management/module-management.component";
import {ScheduleManagementListComponent} from "./entity/schedule-management-list/schedule-management-list.component";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [

  {
    path: '',
    data: {
      requiresAuthentication: true,
      roles: []
    },
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'errands/new',
        component: ErrandComponent
      },
      {
        path: 'errands',
        component: ErrandListComponent
      },
      {
        path: 'schedules',
        component: ScheduleComponent
      },
      {
        path: 'modules/:id',
        component: ModuleComponent
      },
      {
        path: 'modules',
        component: ModulesComponent
      },
      {
        path: 'module',
        component: ModuleComponent
      },
      {
        path: 'scrapper',
        component: ScrapperComponent
      },
      {
        path: 'lol',
        component: StepsComponent
      },
      {
        path: 'user',
        component: UserCreateComponent,
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'users/:id',
        component: UserComponent
      },
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: 'user-configs/:id',
        component: UserConfigComponent
      },
      {
        path: 'user-configs',
        component: UserConfigListComponent
      },
      {
        path: 'additional-hours-config',
        component: AdditionalHoursConfigComponent,
      },
      {
        path: 'additional-hours-configs/:id',
        component: AdditionalHoursConfigComponent,
      },
      {
        path: 'additional-hours-configs',
        component: AdditionalHoursConfigListComponent,
      },
      {
        path: 'class-limit',
        component: ClassLimitComponent
      },
      {
        path: 'class-limits/:id',
        component: ClassLimitComponent
      },
      {
        path: 'class-limits',
        component: ClassLimitListComponent
      },
      {
        path: 'class',
        component: ClassesComponent
      },
      {
        path: 'classes/:id',
        component: ClassesComponent
      },
      {
        path: 'classes',
        component: ClassesListComponent
      },
      {
        path: 'limit-config',
        component: LimitConfigComponent
      },
      {
        path: 'limit-configs/:id',
        component: LimitConfigComponent
      },
      {
        path: 'limit-configs',
        component: LimitConfigListComponent
      },
      {
        path: 'module-general-information',
        component: ModuleGeneralInformationComponent
      },
      {
        path: 'module-general-informations/:id',
        component: ModuleGeneralInformationComponent
      },
      {
        path: 'module-general-informations',
        component: ModuleGeneralInformationListComponent
      },
      {
        path: 'user-signature',
        component: UserSignatureComponent
      },
      {
        path: 'user-signatures/:id',
        component: UserSignatureComponent
      },
      {
        path: 'user-signatures',
        component: UserSignatureListComponent
      },
      {
        path: 'module-management',
        component: ModuleManagementComponent
      },
      {
        path: 'schedule-overview',
        component: ScheduleManagementListComponent
      }
    ]
  },
  {
    path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  },
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"});
