import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ModuleGeneralInformation} from "../model/module-general-information.model";
import {MessageService} from "primeng/api";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";

@Injectable({providedIn: 'root'})
export class ModuleGeneralInformationService {
  public resourceUrl = 'http://localhost:8080/krim/module-general-informations';

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  create(moduleGeneralInformation: ModuleGeneralInformation): Observable<HttpResponse<ModuleGeneralInformation>> {
    return this.http.post<ModuleGeneralInformation>(this.resourceUrl, moduleGeneralInformation, {observe: 'response'}).pipe(
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

  update(moduleGeneralInformation: ModuleGeneralInformation): Observable<HttpResponse<ModuleGeneralInformation>> {
    return this.http.put<ModuleGeneralInformation>(this.resourceUrl, moduleGeneralInformation, {observe: 'response'}).pipe(
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

  find(id: number): Observable<HttpResponse<ModuleGeneralInformation>> {
    return this.http.get<ModuleGeneralInformation>(`${this.resourceUrl}/${id}`, {observe: 'response'}).pipe(
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

  getAll(): Observable<HttpResponse<ModuleGeneralInformation[]>> {
    return this.http.get<ModuleGeneralInformation[]>(this.resourceUrl, {observe: 'response'}).pipe(
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
