import {ModuleType} from "./enum/module-type.enum";
import {Semester} from "./enum/semester.enum";
import {ExamType} from "./enum/exam-type.enum";
import {User} from "./user.model";
import {ModuleGeneralInformation} from "./module-general-information.model";
import {ClassLimit} from "./class-limit.model";
import {Classes} from "./classes.model";
import {Schedule} from "./schedule.model";

export interface IModule {
  id?: number;
  user?: User;
  code?: string;
  name?: string;
  type?: ModuleType;
  semester?: Semester;
  examType?: ExamType;
  userId?: number;
  classes?: Classes;
  moduleGeneralInformation?: ModuleGeneralInformation;
  classLimit?: ClassLimit;
  moduleGeneralInformationId?: number;
  errandIds?: Array<number>;
  scheduleIds?: Array<number>;
  schedule?: Schedule;
}

export class Module implements IModule {
  constructor(
    public id?: number,
    public user?: User,
    public code?: string,
    public name?: string,
    public type?: ModuleType,
    public semester?: Semester,
    public examType?: ExamType,
    public userId?: number,
    public classes?: Classes,
    public moduleGeneralInformation?: ModuleGeneralInformation,
    public classLimit?: ClassLimit,
    public moduleGeneralInformationId?: number,
    public errandIds?: Array<number>,
    public scheduleIds?: Array<number>,
    public schedule?: Schedule
  ) {
    this.classes = classes ? classes : new Classes();
    this.schedule = schedule? schedule : new Schedule();
    // this.moduleGeneralInformation = moduleGeneralInformation ? moduleGeneralInformation : new ModuleGeneralInformation();
  }

  public static fromAssertion(module: Module): Module {
    return new Module(
      module.id,
      module.user ? User.fromAssertion(module.user) : null,
      module.code,
      module.name,
      (module.type && (typeof module.type === 'string')) ? <ModuleType>ModuleType[module.type] : null,
      (module.semester && (typeof module.semester === 'string')) ? <Semester>Semester[module.semester] : null,
      (module.examType && (typeof module.examType === 'string')) ? <ExamType>ExamType[module.examType] : null,
      module.userId,
      module.classes ? Classes.fromAssertion(module.classes) : null,
      module.moduleGeneralInformation ? ModuleGeneralInformation.fromAssertion(module.moduleGeneralInformation) : null,
      module.classLimit ? ClassLimit.fromAssertion(module.classLimit) : null,
      module.moduleGeneralInformationId,
      module.errandIds ? module.errandIds : [],
      module.scheduleIds ? module.scheduleIds : [],
      module.schedule ? Schedule.fromAssertion(module.schedule) : new Schedule()
    )
  }

  public toJson(): any {
    return {
      id: this.id,
      user: this.user,
      code: this.code,
      name: this.name,
      type: this.type,
      semester: this.semester,
      examType: this.examType,
      userId: this.userId,
      classes: this.classes.toJson(),
      moduleGeneralInformation: this.moduleGeneralInformation.toJson(),
      classLimit: this.classLimit.toJson(),
      moduleGeneralInformationId: this.moduleGeneralInformationId,
      errandIds: this.errandIds,
      scheduleIds: this.scheduleIds,
      schedule: this.schedule
    }
  }
}
