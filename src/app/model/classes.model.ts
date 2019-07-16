export interface IClasses {
  id?: number;
  lecture?: number;
  laboratory?: number;
  blackboard?: number;
  project?: number;
  seminar?: number;
  practical?: number;
  outdoor?: number;
  workshop?: number;
  elearning?: number;
  other?: number;
  sum?: number;
}

export class Classes implements IClasses {
  constructor(
    public id?: number,
    public lecture?: number,
    public laboratory?: number,
    public blackboard?: number,
    public project?: number,
    public seminar?: number,
    public practical?: number,
    public outdoor?: number,
    public workshop?: number,
    public elearning?: number,
    public other?: number,
    public sum?: number
  ) {
  }

  public static fromAssertion(classes: IClasses): Classes {
    return new Classes(
      classes.id,
      classes.lecture,
      classes.laboratory,
      classes.blackboard,
      classes.project,
      classes.seminar,
      classes.practical,
      classes.outdoor,
      classes.workshop,
      classes.elearning,
      classes.other,
      classes.sum
    )
  }

  public toJson(): any {
    return {
      id: this.id,
      lecture: this.lecture,
      laboratory: this.laboratory,
      blackboard: this.blackboard,
      project: this.project,
      seminar: this.seminar,
      practical: this.practical,
      outdoor: this.outdoor,
      workshop: this.workshop,
      elearning: this.elearning,
      other: this.other,
      sum: this.sum
    }
  }

}
