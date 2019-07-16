import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MessageService} from "primeng/api";
import {throwError} from "rxjs/internal/observable/throwError";
import {catchError, map} from "rxjs/operators";
import {UserSignature} from "../../model/user-signature.model";

@Injectable({providedIn: 'root'})
export class UserSignatureService {

  public resourceUrl = 'http://localhost:8080/krim/user-signatures';

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  create(userSignature: UserSignature): Observable<HttpResponse<UserSignature>> {
    return this.http.post<UserSignature>(this.resourceUrl, userSignature, {observe: 'response'}).pipe(
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

  update(userSignature: UserSignature): Observable<HttpResponse<UserSignature>> {
    return this.http.put<UserSignature>(this.resourceUrl, userSignature, {observe: 'response'}).pipe(
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

  find(id: number): Observable<HttpResponse<UserSignature>> {
    return this.http.get<UserSignature>(`${this.resourceUrl}/${id}`, {observe: 'response'}).pipe(
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

  getAll(): Observable<HttpResponse<UserSignature[]>> {
    return this.http.get<UserSignature[]>(this.resourceUrl, {observe: 'response'}).pipe(
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
