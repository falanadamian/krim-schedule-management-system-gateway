import {AdditionalHoursReason} from "./enum/additional-hours-reason.enum";

export interface IAdditionalHoursConfig {
  id?: number;
  reason?: AdditionalHoursReason;
  coefficient?: number;
  includesLimit?: boolean;
  note?: string;
}

export class AdditionalHoursConfig implements IAdditionalHoursConfig {
  constructor(
    public id?: number,
    public reason?: AdditionalHoursReason,
    public coefficient?: number,
    public includesLimit?: boolean,
    public note?: string
  ) {
    this.includesLimit = this.includesLimit || false;
  }

  public static fromAssertion(additionalHoursConfig: AdditionalHoursConfig): AdditionalHoursConfig {
    return new AdditionalHoursConfig(
      additionalHoursConfig.id,
      additionalHoursConfig.reason,
      additionalHoursConfig.coefficient,
      additionalHoursConfig.includesLimit,
      additionalHoursConfig.note,
    )
  }

  public toJson(): any {
    return {
      id: this.id,
      reason: this.reason,
      coefficient: this.coefficient,
      includesLimit: this.includesLimit,
      note: this.note,
    }
  }
}
