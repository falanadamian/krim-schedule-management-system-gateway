export interface IClassLimit {
  id?: number;
  laboratoryClassLimit?: number;
  blackboardClassLimit?: number;
  projectClassLimit?: number;
  seminarClassLimit?: number;
}

export class ClassLimit implements IClassLimit {
  constructor(
    public id?: number,
    public laboratoryClassLimit?: number,
    public blackboardClassLimit?: number,
    public projectClassLimit?: number,
    public seminarClassLimit?: number
  ) {
  }

  public static fromAssertion(classLimit: IClassLimit): ClassLimit {
    return new ClassLimit(
      classLimit.id,
      classLimit.laboratoryClassLimit,
      classLimit.blackboardClassLimit,
      classLimit.projectClassLimit,
      classLimit.seminarClassLimit
    )
  }

  public toJson(): any {
    return {
      id: this.id,
      laboratoryClassLimit: this.laboratoryClassLimit,
      blackboardClassLimit: this.blackboardClassLimit,
      projectClassLimit: this.projectClassLimit,
      seminarClassLimit: this.seminarClassLimit
    }
  }
}
