import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import {SessionStorageService} from "../service/session-storage.service";
import {LocalStorageService} from "../service/local-storage.service";
import {of} from "rxjs/index";
import {SigninForm} from "../model/signin-form";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class JWTProviderService {

  private localStorage: Storage;
  private sessionStorage: Storage;

  constructor(private http: HttpClient) {
    this.localStorage = localStorage;
    this.sessionStorage = sessionStorage;
  }

  getToken() {
    return this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
  }

  login(signinForm: SigninForm): Observable<any> {
    return this.http.post('http://localhost:8080/krim/authentication/signin', signinForm, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), observe: 'response' })
      .pipe(map( resp => {
        const bearerToken = resp.headers.get('Authorization');
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          const jwt = bearerToken.slice(7, bearerToken.length);
          this.storeAuthenticationToken(jwt, signinForm.rememberMe);
          return jwt;
        }
    }),
        catchError((error) => of( () => {
          console.log("JWTProvider login error");
        })),
        finalize(() => {
        })
      );
  }

  loginWithToken(jwt, rememberMe) {
    if (jwt) {
      this.storeAuthenticationToken(jwt, rememberMe);
      return Promise.resolve(jwt);
    } else {
      return Promise.reject('Auth reject');
    }
  }

  storeAuthenticationToken(jwt, rememberMe) {
    if (rememberMe) {
      LocalStorageService.setJWT(jwt);
    } else {
      SessionStorageService.setJWT(jwt);
    }
  }

  logout(): Observable<any> {
    return new Observable(observer => {
      LocalStorageService.signOut();
      SessionStorageService.signOut();
      observer.complete();
    });
  }
}
