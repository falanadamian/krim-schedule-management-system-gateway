import {Errand} from "./errand.model";
import {ExamType} from "./enum/exam-type.enum";
import {Classes} from "./classes.model";
import {User} from "./user.model";

export interface ISchedule {
  id?: number;
  examType?: ExamType;
  assigneeId?: number;
  assignorId?: number;
  classes?: Classes;
  moduleId?: number;
  assigneeIdArray?: number[]
  assignor?: User
}

export class Schedule implements ISchedule {
  constructor(
    public id?: number,
    public examType?: ExamType,
    public assigneeId?: number,
    public assignorId?: number,
    public classes?: Classes,
    public moduleId?: number,
    public assigneeIdArray?: number[],
    public assignor?: User
  ) {
    this.classes = this.classes ? this.classes : new Classes();
  }

  public static fromAssertion(schedule: Schedule): Schedule {
    return new Schedule(
      schedule.id,
      schedule.examType ? <ExamType>ExamType[schedule.examType] : null,
      schedule.assigneeId,
      schedule.assignorId,
      schedule.classes ? Classes.fromAssertion(schedule.classes) : new Classes(),
      schedule.moduleId,
      schedule.assigneeId ? [schedule.assigneeId] : [],
      schedule.assignor ? schedule.assignor : new User()
    )
  }

  public toJson(): any {
    return {
      id: this.id,
      examType: this.examType,
      assigneeId: this.assigneeId,
      assignorId: this.assignorId,
      classes: this.classes.toJson(),
      moduleId: this.moduleId,
      assigneeIdArray: this.assigneeIdArray,
      assignor: this.assignor
    }
  }
}
