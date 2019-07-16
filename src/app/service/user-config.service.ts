import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserConfig} from "../model/user-config.model";
import {MessageService} from "primeng/api";
import {throwError} from "rxjs/internal/observable/throwError";
import {catchError, map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class UserConfigService {

  public resourceUrl = 'http://localhost:8080/krim/user-configs';

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  create(userConfig: UserConfig): Observable<HttpResponse<UserConfig>> {
    return this.http.post<UserConfig>(this.resourceUrl, userConfig, {observe: 'response'}).pipe(
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

  update(userConfig: UserConfig): Observable<HttpResponse<UserConfig>> {
    return this.http.put<UserConfig>(this.resourceUrl, userConfig, {observe: 'response'}).pipe(
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

  find(position: Position): Observable<HttpResponse<UserConfig>> {
    return this.http.get<UserConfig>(`${this.resourceUrl}/${position}`, {observe: 'response'}).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        this.messageService.add({severity: 'warn', summary: 'Wystąpił błąd', detail: error.error.message});
        return throwError(error);
      })
    );
  }

  delete(position: Position): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${position}`, {observe: 'response'}).pipe(
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

  getAll(): Observable<HttpResponse<UserConfig[]>> {
    return this.http.get<UserConfig[]>(this.resourceUrl, {observe: 'response'}).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Wystąpił nieoczekiwany błąd',
          detail: error.error.message
        });
        return throwError(error);
      })
    );
  }

}
