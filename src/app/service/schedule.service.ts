import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Schedule} from "../model/schedule.model";
import {Errand} from "../model/errand.model";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";
import {MessageService} from "primeng/api";

@Injectable({ providedIn: 'root' })
export class ScheduleService {
  public resourceUrl = 'http://localhost:8080/krim/schedules';

  constructor(private http: HttpClient, private messageService: MessageService) {}

  create(schedule: Schedule): Observable<HttpResponse<Schedule>> {
    return this.http.post<Schedule>(this.resourceUrl, schedule, { observe: 'response' }).pipe(
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

  update(schedule: Schedule): Observable<HttpResponse<Schedule>> {
    return this.http.put<Schedule>(this.resourceUrl, schedule, { observe: 'response' }).pipe(
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

  find(id: number): Observable<HttpResponse<Schedule>> {
    return this.http.get<Schedule>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
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
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
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

  getAll(): Observable<HttpResponse<Schedule[]>> {
    return this.http.get<Schedule[]>(this.resourceUrl, {observe: 'response'}).pipe(
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

  getAllForCurrentlyLoggedInUser(): Observable<HttpResponse<Schedule[]>> {
    return this.http.get<Schedule[]>(`${this.resourceUrl}/me`, {observe: 'response'}).pipe(
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

  getAllByIds(ids: Array<number>): Observable<HttpResponse<Schedule[]>> {
    return this.http.post<Schedule[]>(`${this.resourceUrl}/ids`, ids, {observe: 'response'}).pipe(
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
