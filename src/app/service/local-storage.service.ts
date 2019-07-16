import { Injectable } from '@angular/core';
import {StorageConstants} from "../constants/storage.constants";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  public static setJWT(token: string) {
    localStorage.removeItem(StorageConstants.AUTHENTICATION_JWT);
    localStorage.setItem(StorageConstants.AUTHENTICATION_JWT, token);
  }

  public static getJWT(): string {
    return localStorage.getItem(StorageConstants.AUTHENTICATION_JWT);
  }

  public static setUsername(username: string) {
    localStorage.removeItem(StorageConstants.AUTHENTICATION_USERNAME);
    localStorage.setItem(StorageConstants.AUTHENTICATION_USERNAME, username);
  }

  public static getUsername(): string {
    return localStorage.getItem(StorageConstants.AUTHENTICATION_USERNAME);
  }

  public static setRoles(roles: string[]) {
    localStorage.removeItem(StorageConstants.AUTHENTICATION_ROLES);
    localStorage.setItem(StorageConstants.AUTHENTICATION_ROLES, JSON.stringify(roles));
  }

  public getRoles(): string[] {

    let roles: Array<string> = [];

    if (localStorage.getItem(StorageConstants.AUTHENTICATION_JWT)) {
      JSON.parse(localStorage.getItem(StorageConstants.AUTHENTICATION_ROLES)).forEach(role => {
        roles.push(role.role);
      });
    }

    return roles;
  }

  public static signOut() {
    localStorage.clear();
  }

}
