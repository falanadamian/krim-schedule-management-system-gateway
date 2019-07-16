import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IModule, Module} from "../model/module.model";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";
import {MessageService} from "primeng/api";

@Injectable({ providedIn: 'root' })
export class ModuleService {
  public resourceUrl = 'http://localhost:8080/krim/modules';

  constructor(private http: HttpClient, private messageService: MessageService) {}

  create(module: IModule): Observable<HttpResponse<Module>> {
    return this.http.post<Module>(this.resourceUrl, module, { observe: 'response' }).pipe(
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

  update(module: IModule): Observable<HttpResponse<Module>> {
    return this.http.put<Module>(this.resourceUrl, module, { observe: 'response' }).pipe(
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

  find(id: number): Observable<HttpResponse<Module>> {
    return this.http.get<Module>(`${this.resourceUrl}/${id}`, { observe: 'response' }).pipe(
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

  getAll(): Observable<HttpResponse<Module[]>> {
    return this.http.get<Module[]>(this.resourceUrl, { observe: 'response' }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        this.messageService.add({severity: 'warn', summary: 'Wystąpił błąd', detail: error.error.message});
        return throwError(error);
      })
    );
  }

  getAllByIds(ids: Array<number>): Observable<HttpResponse<Module[]>> {
    return this.http.post<Module[]>(this.resourceUrl, ids, { observe: 'response' }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        this.messageService.add({severity: 'warn', summary: 'Wystąpił błąd', detail: error.error.message});
        return throwError(error);
      })
    );
  }

  getAllForCurrentlyLoggedInUser(): Observable<HttpResponse<Module[]>> {
    return this.http.get<Module[]>(`${this.resourceUrl}/me`, { observe: 'response' }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        this.messageService.add({severity: 'warn', summary: 'Wystąpił błąd', detail: error.error.message});
        return throwError(error);
      })
    );
  }

  /*getAllByIds(ids: Array<number>): Observable<HttpResponse<Module[]>> {
    return this.http.post<Module[]>(`${this.resourceUrl}/all`, ids, { observe: 'response' }).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        this.messageService.add({severity: 'warn', summary: 'Wystąpił błąd', detail: error.error.message});
        return throwError(error);
      })
    );
  }*/
}
