export interface IStudyInfo {
  id?: number;
  studyYear?: number;
  registeredPhD?: boolean;
  scholarship?: boolean;
  patronId?: number;
  userId?: number;
}

export class StudyInfo implements IStudyInfo {
  constructor(
    public id?: number,
    public studyYear?: number,
    public registeredPhD?: boolean,
    public scholarship?: boolean,
    public patronId?: number,
    public userId?: number
  ) {
    this.registeredPhD = this.registeredPhD || false;
    this.scholarship = this.scholarship || false;
    this.patronId= this.patronId || null;
  }

  public static fromAssertion(studyInfo: StudyInfo): StudyInfo {
    return studyInfo ? new StudyInfo(
      studyInfo.id,
      studyInfo.studyYear,
      studyInfo.registeredPhD,
      studyInfo.scholarship,
      studyInfo.patronId,
      studyInfo.userId
    ) : new StudyInfo();
  }

  public toJson(): any {
    return {
      id: this.id,
      studyYear: this.studyYear,
      registeredPhD: this.registeredPhD,
      scholarship: this.scholarship,
      patronId: this.patronId,
      userId: this.userId
    }
  }


}
