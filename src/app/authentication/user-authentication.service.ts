import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import {UserAuthentication} from "./user-authentication";
import {User} from "../model/user.model";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";
import {MessageService} from "primeng/api";

@Injectable({ providedIn: 'root' })
export class UserAuthenticationService {
  constructor(private http: HttpClient, private messageService: MessageService) {}

  get(): Observable<HttpResponse<UserAuthentication>> {
    return this.http.get<UserAuthentication>('http://localhost:8080/krim/authentication/account', { observe: 'response' });
  }

  activate(activationCode: any): Observable<HttpResponse<User>> {
    return this.http.get<User>('http://localhost:8080/krim/authentication/activate?key='+ activationCode, { observe: 'response' }).pipe(
      map((response) => {
        this.messageService.add({severity: 'success', summary: 'Potwierdzenie', detail: response.headers.get('KRIM')});
        return response;
      }),
      catchError((error) => {
        this.messageService.add({severity: 'warn', summary: 'Wystąpił błąd', detail: error.error.message});
        return throwError(error);
      })
    );
  }

  resetPassword(email: string): Observable<HttpResponse<UserAuthentication>> {
    return this.http.get<UserAuthentication>('http://localhost:8080/krim/authentication/password/reset?email=' + email, { observe: 'response' }).pipe(
      map((response) => {
        this.messageService.add({severity: 'success', summary: 'Potwierdzenie', detail: response.headers.get('KRIM')});
        return response;
      }),
      catchError((error) => {
        this.messageService.add({severity: 'warn', summary: 'Wystąpił błąd', detail: error.error.message});
        return throwError(error);
      })
    );
  }

  completeResetPassword(password: string, resetKey: string): Observable<HttpResponse<UserAuthentication>> {
    return this.http.get<UserAuthentication>(`http://localhost:8080/krim/authentication/password/set?password=${password}&resetKey=${resetKey}`, { observe: 'response' }).pipe(
      map((response) => {
        this.messageService.add({severity: 'success', summary: 'Potwierdzenie', detail: response.headers.get('KRIM')});
        return response;
      }),
      catchError((error) => {
        this.messageService.add({severity: 'warn', summary: 'Wystąpił błąd', detail: error.error.message});
        return throwError(error);
      })
    );
  }
}
