import {ClassType} from "./enum/class-type.enum";

export interface IErrand {
    id?: number;
    classType?: ClassType;
    hours?: number;
    groups?: number;
    students?: number;
    additionalHoursRatio?: number;
    errandNumber?: string;
    department?: string;
    note?: string;
    code?: string;
    moduleId?: number;
    documentId?: number;
    schedulesIds?: Array<number>;
}

export class Errand implements IErrand {
    constructor(
        public id?: number,
        public classType?: ClassType,
        public hours?: number,
        public groups?: number,
        public students?: number,
        public additionalHoursRatio?: number,
        public errandNumber?: string,
        public department?: string,
        public note?: string,
        public code?: string,
        public moduleId?: number,
        public documentId?: number,
        public schedulesIds?: Array<number>
    ) {}


  public static fromAssertion(errand: Errand): Errand {
    return new Errand(
      errand.id,
      errand.classType,
      errand.hours,
      errand.groups,
      errand.students,
      errand.additionalHoursRatio,
      errand.errandNumber,
      errand.department,
      errand.note,
      errand.code,
      errand.moduleId,
      errand.documentId,
      errand.schedulesIds
    )
  }

  public toJson(): any {
    return {
      id: this.id,
      classType: this.classType,
      hours: this.hours,
      groups: this.groups,
      students: this.students,
      additionalHoursRatio: this.additionalHoursRatio,
      errandNumber: this.errandNumber,
      department: this.department,
      note: this.note,
      code: this.code,
      moduleId: this.moduleId,
      documentId: this.documentId,
      schedulesIds: this.schedulesIds
    }
  }


}
