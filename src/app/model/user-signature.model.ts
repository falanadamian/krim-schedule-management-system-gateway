import {IModuleGeneralInformation, ModuleGeneralInformation} from "./module-general-information.model";
import {Degree} from "./enum/degree.enum";

export interface IUserSignature {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  degree?: Degree;
  modulesInChargeover?: IModuleGeneralInformation[];
  modulesInManagement?: IModuleGeneralInformation[];
  modulesInChargeoverIds?: Array<number>;
  modulesInManagementIds?: Array<number>;
}

export class UserSignature implements IUserSignature {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public degree?: Degree,
    public modulesInChargeover?: ModuleGeneralInformation[],
    public modulesInManagement?: ModuleGeneralInformation[],
    public modulesInChargeoverIds?: Array<number>,
    public modulesInManagementIds?: Array<number>
  ) {
    this.id = id ? id : null;
    this.modulesInChargeoverIds = this.modulesInChargeoverIds ? this.modulesInChargeoverIds : [];
    this.modulesInManagementIds = this.modulesInManagementIds ? this.modulesInManagementIds : [];
  }

  public static fromAssertion(userSignature: UserSignature): UserSignature {
    return new UserSignature(
      userSignature.id,
      userSignature.firstName,
      userSignature.lastName,
      userSignature.email,
      userSignature.degree ? <Degree>Degree[userSignature.degree] : null,
      userSignature.modulesInChargeover ?
        userSignature.modulesInChargeover.map(moduleInChargeover => ModuleGeneralInformation.fromAssertion(moduleInChargeover))
        : (userSignature.modulesInChargeoverIds ? userSignature.modulesInChargeoverIds.map( moduleInChargeoverId => new ModuleGeneralInformation(moduleInChargeoverId)) : null),
      userSignature.modulesInManagement ? userSignature.modulesInManagement.map(moduleInManagement => ModuleGeneralInformation.fromAssertion(moduleInManagement))
        : (userSignature.modulesInManagementIds ? userSignature.modulesInManagementIds.map(moduleInManagementId => new ModuleGeneralInformation(moduleInManagementId)) : null),
      userSignature.modulesInChargeoverIds ? userSignature.modulesInChargeoverIds : [],
      userSignature.modulesInManagementIds ? userSignature.modulesInManagementIds : []
    )
  }

  public toJson(): any {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      degree: this.degree,
      modulesInChargeover: this.modulesInChargeover,
      modulesInManagement: this.modulesInManagement,
      modulesInChargeoverIds: this.modulesInChargeoverIds,
      modulesInManagementIds: this.modulesInManagementIds,
    }
  }
}
