import { Injectable } from '@angular/core';

import {PrincipalService} from "./principal.service";
import {JWTProviderService} from "./jwt-provider.service";
import {catchError, finalize, map, flatMap} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {Observable} from "rxjs/internal/Observable";

@Injectable({ providedIn: 'root' })
export class SigninService {
  constructor(private principalService: PrincipalService, private jwtProvider: JWTProviderService) {}

  signin(credentials) : Observable<Promise<any>> {
    return this.jwtProvider.login(credentials).pipe(
      map((response) => {
        return this.principalService.identity(true).pipe(
          map(data => {
            return data;
          }),
          catchError((error) => of( () => {
          })),
          finalize(() => {
          }
          )
        ).toPromise();
      }),
      catchError(error => {
        this.logout();
        return of(error);
      }),
      finalize(() => {
        }
      )
    );
  }

  loginWithToken(jwt, rememberMe) {
    return this.jwtProvider.loginWithToken(jwt, rememberMe);
  }

  logout() {
    this.jwtProvider.logout().subscribe();
    this.principalService.authenticate(null);
  }
}
