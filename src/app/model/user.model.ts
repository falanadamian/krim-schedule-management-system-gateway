import {IDocument, Document} from "./document.model";
import {IStateTracker, StateTracker} from "./state-tracker.model";
import {IModuleGeneralInformation, ModuleGeneralInformation} from "./module-general-information.model";
import {Degree} from "./enum/degree.enum";
import {IStudyInfo, StudyInfo} from "./study-info.model";
import {IUserConfig, UserConfig} from "./user-config.model";
import {RoleType} from "./enum/role-type";
import {Role} from "./role";

export interface IUser {
    id?: number;
    firstName?: string;
    lastName?: string;
    identity?: string;
    username?: string;
    email?: string;
    password?: string;
    degree?: Degree;
    roles?: Role[],
    reduction?: number;
    note?: string;
    authKey?: string;
    positionPosition?: string;
    positionId?: number;
    studyInfoId?: number;
    files?: IDocument[];
    stateDetails?: IStateTracker[];
    childUsers?: IUser[];
    modulesInChargeoves?: ModuleGeneralInformation[];
    modulesInManagement?: ModuleGeneralInformation[];
    moduleId?: number;
    parentUserId?: number;
    documents?: IDocument[];
    studyInfo?: IStudyInfo;
    userConfig?: IUserConfig;
    childUsersIds?: Array<number>;
    modulesInChargeovesIds?: Array<number>;
    modulesInManagementIds?: Array<number>;
    configId?: number;
}

export class User implements IUser {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public identity?: string,
        public username?: string,
        public email?: string,
        public password?: string,
        public degree?: Degree,
        public roles?: Role[],
        public reduction?: number,
        public note?: string,
        public authKey?: string,
        public positionPosition?: string,
        public positionId?: number,
        public position?: Degree,
        public studyInfoId?: number,
        public files?: Document[],
        public stateDetails?: StateTracker[],
        public childUsers?: User[],
        public modulesInChargeoves?: ModuleGeneralInformation[],
        public modulesInManagement?: ModuleGeneralInformation[],
        public moduleId?: number,
        public parentUserId?: number,
        public documents?: Document[],
        public studyInfo?: StudyInfo,
        public userConfig?: UserConfig,
        public childUsersIds?: Array<number>,
        public modulesInChargeovesIds?: Array<number>,
        public modulesInManagementIds?: Array<number>,
        public configId?: number
    ) {
      this.id = id ? id : null;
      this.studyInfo = studyInfo ? studyInfo : new StudyInfo();
      this.modulesInChargeovesIds = this.modulesInChargeovesIds ? this.modulesInChargeovesIds : [];
      this.modulesInManagementIds = this.modulesInManagementIds ? this.modulesInManagementIds : [];
    }

  public static fromAssertion(user: User): User {
    return new User(
      user.id,
      user.firstName,
      user.lastName,
      user.identity,
      user.username,
      user.email,
      user.password,
      (user.degree && (typeof user.degree === 'string')) ? <Degree>Degree[user.degree] : null,
      user.roles ? user.roles.map( role => Role.fromAssertion(role)) : null,
      user.reduction,
      user.note,
      user.authKey,
      user.positionPosition,
      user.positionId,
      (user.position && (typeof user.position === 'string')) ? <Degree>Degree[user.position] : null,
      user.studyInfoId,
      (user.files) ? user.files.map( file => Document.fromJson(file)) : null,
      (user.stateDetails) ? null : null, //TODO
      user.childUsers ? user.childUsers.map( childUser => User.fromAssertion(childUser)) : null,
      user.modulesInChargeoves ? user.modulesInChargeoves.map( moduleInChargeover => ModuleGeneralInformation.fromAssertion(moduleInChargeover)) : null,
      user.modulesInManagement ? user.modulesInManagement.map( moduleInManagement => ModuleGeneralInformation.fromAssertion(moduleInManagement)) : null,
      user.moduleId,
      user.parentUserId,
      user.documents ? user.documents.map( document => Document.fromJson(document)) : null,
      user.studyInfo ? StudyInfo.fromAssertion(user.studyInfo) : new StudyInfo(),
      user.userConfig ? UserConfig.fromAssertion(user.userConfig) : null,
      user.childUsersIds ? user.childUsersIds : [],
      user.modulesInChargeovesIds ? user.modulesInChargeovesIds : [],
      user.modulesInManagementIds ? user.modulesInManagementIds : [],
      user.configId
    )
  }

    public toJson(): any {
      return {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        identity: this.identity,
        username: this.username,
        email: this.email,
        password: this.password,
        degree: this.degree,
        roles: this.roles.map( role => role.toJson()),
        reduction: this.reduction,
        note: this.note,
        authKey: this.authKey,
        positionPosition: this.positionPosition,
        positionId: this.positionId,
        position: this.position,
        studyInfoId: this.studyInfoId,
        files: this.files,
        stateDetails: this.stateDetails,
        childUsers: this.childUsers,
        modulesInChargeoves: this.modulesInChargeoves,
        modulesInManagement: this.modulesInManagement,
        moduleId: this.moduleId,
        parentUserId: this.parentUserId,
        documents: this.documents,
        studyInfo: this.studyInfo.toJson(),
        userConfig: this.userConfig,
        childUsersIds: this.childUsersIds,
        modulesInChargeovesIds: this.modulesInChargeovesIds ,
        modulesInManagementIds: this.modulesInManagementIds,
        configId: this.configId
      }
    }

    public static reassignFields(assignee: User, assignor: User): User {
      return Object.assign(assignee, assignor)
    }
}
