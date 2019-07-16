import { Injectable } from '@angular/core';
import {StorageConstants} from "../constants/storage.constants";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() {}

  public static setJWT(token: string) {
    sessionStorage.removeItem(StorageConstants.AUTHENTICATION_JWT);
    sessionStorage.setItem(StorageConstants.AUTHENTICATION_JWT, token);
  }

  public static getJWT(): string {
    return sessionStorage.getItem(StorageConstants.AUTHENTICATION_JWT);
  }

  public static setUsername(username: string) {
    sessionStorage.removeItem(StorageConstants.AUTHENTICATION_USERNAME);
    sessionStorage.setItem(StorageConstants.AUTHENTICATION_USERNAME, username);
  }

  public static getUsername(): string {
    return sessionStorage.getItem(StorageConstants.AUTHENTICATION_USERNAME);
  }

  public static setRoles(roles: string[]) {
    sessionStorage.removeItem(StorageConstants.AUTHENTICATION_ROLES);
    sessionStorage.setItem(StorageConstants.AUTHENTICATION_ROLES, JSON.stringify(roles));
  }

  public getRoles(): string[] {

    let roles: Array<string> = [];

    if (sessionStorage.getItem(StorageConstants.AUTHENTICATION_JWT)) {
      JSON.parse(sessionStorage.getItem(StorageConstants.AUTHENTICATION_ROLES)).forEach(role => {
        roles.push(role.role);
      });
    }

    return roles;
  }

  public static signOut() {
    sessionStorage.clear();
  }

  public static setURL(url: string) {
    sessionStorage.removeItem(StorageConstants.URL);
    sessionStorage.setItem(StorageConstants.URL, url);
  }

  public static getURL(): string {
    return sessionStorage.getItem(StorageConstants.URL);
  }

}
