export interface IUserConfig {
  id?: number;
  position?: Position;
  pensum?: number;
  pensumLimit?: number;
  overtimeRateFullTime?: number;
  overtimeRatePartTime?: number;
}

export class UserConfig implements IUserConfig {
  constructor(
    public id?: number,
    public position?: Position,
    public pensum?: number,
    public pensumLimit?: number,
    public overtimeRateFullTime?: number,
    public overtimeRatePartTime?: number
  ) {
  }

  public static fromAssertion(userConfig: UserConfig): UserConfig {
    return new UserConfig(
      userConfig.id,
      userConfig.position,
      userConfig.pensum,
      userConfig.pensumLimit,
      userConfig.overtimeRateFullTime,
      userConfig.overtimeRatePartTime
    )
  }

  public toJson(): any {
    return {
      id: this.id,
      position: this.position,
      pensum: this.pensum,
      pensumLimit: this.pensumLimit,
      overtimeRateFullTime: this.overtimeRateFullTime,
      overtimeRatePartTime: this.overtimeRatePartTime
    }
  }


}
