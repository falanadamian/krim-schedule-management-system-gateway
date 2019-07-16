export interface ILimitConfig {
  id?: number;
  partTime?: number;
  fullTime?: number;
  fullTimePolish?: number;
  fullTimeEnglish?: number;
  bachelorThesis?: number;
  masterThesis?: number;
  hoursForExamPerYear?: number;
  physicalHours?: number;
}

export class LimitConfig implements ILimitConfig {
  constructor(
    public id?: number,
    public partTime?: number,
    public fullTime?: number,
    public fullTimePolish?: number,
    public fullTimeEnglish?: number,
    public bachelorThesis?: number,
    public masterThesis?: number,
    public hoursForExamPerYear?: number,
    public physicalHours?: number
  ) {
  }

  public static fromAssertion(limitConfig: LimitConfig): LimitConfig {
    return new LimitConfig(
      limitConfig.id,
      limitConfig.partTime,
      limitConfig.fullTime,
      limitConfig.fullTimePolish,
      limitConfig.fullTimeEnglish,
      limitConfig.bachelorThesis,
      limitConfig.masterThesis,
      limitConfig.hoursForExamPerYear,
      limitConfig.physicalHours
    )
  }

  public toJson(): any {
    return {
      id: this.id,
      partTime: this.partTime,
      fullTime: this.fullTime,
      fullTimePolish: this.fullTimePolish,
      fullTimeEnglish: this.fullTimeEnglish,
      bachelorThesis: this.bachelorThesis,
      masterThesis: this.masterThesis,
      hoursForExamPerYear: this.hoursForExamPerYear,
      physicalHours: this.physicalHours
    }
  }
}
