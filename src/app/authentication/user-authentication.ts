export class UserAuthentication {
  constructor(
    public activated: boolean,
    public roles: string[],
    public email: string,
    public firstName: string,
    public lastName: string,
    public username: string,
  ) {}
}
