import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {UserAuthenticationService} from "./user-authentication.service";
import {catchError, finalize, map, tap} from "rxjs/operators";
import { of } from "rxjs";

@Injectable({providedIn: 'root'})
export class PrincipalService {
  private userIdentity: any;
  private authenticated = false;
  private authenticationState = new Subject<any>();

  constructor(private userAuthenticationService: UserAuthenticationService) {
  }

  authenticate(identity) {
    this.userIdentity = identity;
    this.authenticated = identity !== null;
    this.authenticationState.next(this.userIdentity);
  }

  hasAnyAuthority(authorities: string[]): boolean {
    return this.hasAnyAuthorityDirect(authorities);
  }

  hasAnyAuthorityDirect(roles: string[]): boolean {
    if (!this.authenticated || !this.userIdentity || !this.userIdentity.roles) {
      return false;
    }

    let authorized: boolean = false;

    roles.forEach( role => {
      this.userIdentity.roles.forEach( userRole => {
        if(userRole.roleType == role) {
          authorized = true;
        }
      })
    });

    return authorized;
  }

  identity(force?: boolean): Observable<any> {
    if (force === true) {
      this.userIdentity = undefined;
    }

    if (this.userIdentity) {
      return of(this.userIdentity);
    }

    return this.userAuthenticationService.get().pipe(
      map((response) => {
        const userAuthenticationService = response.body;
        if (userAuthenticationService) {
          this.userIdentity = userAuthenticationService;
          this.authenticated = true;
        } else {
          this.userIdentity = null;
          this.authenticated = false;
        }
        this.authenticationState.next(this.userIdentity);
        return response;
      }),
      catchError((error) => of( () => {
        this.userIdentity = null;
        this.authenticated = false;
        this.authenticationState.next(this.userIdentity);
        return null;
      })),
      finalize(() => {
      })
    );

  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getAuthenticationState(): Observable<any> {
    return this.authenticationState.asObservable();
  }

}
