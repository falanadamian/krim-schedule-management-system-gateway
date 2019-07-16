import {RoleType} from "./enum/role-type";

export interface IRole {
  roleType?: RoleType;
}

export class Role {

  constructor(
    public roleType?: RoleType,
  ) {
  }

  public static fromAssertion(role: Role): Role {
    return new Role(
      role.roleType ? <RoleType>RoleType[role.roleType] : null
    );
  }

  public toJson(): any {
    return {
      roleType: this.roleType
    }
  }

  public static reassignFields(assignee: Role, assignor: Role): Role {
    return Object.assign(assignee, assignor)
  }

}
