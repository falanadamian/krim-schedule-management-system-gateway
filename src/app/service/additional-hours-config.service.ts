import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AdditionalHoursConfig} from "../model/additional-hours-config.model";
import {UserConfig} from "../model/user-config.model";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";
import {MessageService} from "primeng/api";

@Injectable({providedIn: 'root'})
export class AdditionalHoursConfigService {
  public resourceUrl = 'http://localhost:8080/krim/additional-hours-configs';

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  create(additionalHoursConfig: AdditionalHoursConfig): Observable<HttpResponse<AdditionalHoursConfig>> {
    return this.http.post<AdditionalHoursConfig>(this.resourceUrl, additionalHoursConfig, {observe: 'response'}).pipe(
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

  update(additionalHoursConfig: AdditionalHoursConfig): Observable<HttpResponse<AdditionalHoursConfig>> {
    return this.http.put<AdditionalHoursConfig>(this.resourceUrl, additionalHoursConfig, {observe: 'response'}).pipe(
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

  find(id: number): Observable<HttpResponse<AdditionalHoursConfig>> {
    return this.http.get<AdditionalHoursConfig>(`${this.resourceUrl}/${id}`, {observe: 'response'}).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        this.messageService.add({severity: 'warn', summary: 'Wystąpił błąd', detail: error.error.message});
        return throwError(error);
      })
    );
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'}).pipe(
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

  getAll(): Observable<HttpResponse<AdditionalHoursConfig[]>> {
    return this.http.get<AdditionalHoursConfig[]>(this.resourceUrl, {observe: 'response'}).pipe(
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
