import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser, User} from "../model/user.model";
import {catchError, map} from "rxjs/operators";
import {MessageService} from "primeng/api";
import {throwError} from "rxjs/internal/observable/throwError";
import {Errand} from "../model/errand.model";


@Injectable({providedIn: 'root'})
export class UserService {

  public resourceUrl = 'http://localhost:8080/krim/users';

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  create(user: IUser): Observable<HttpResponse<User>> {
    return this.http.post<User>(this.resourceUrl, user, {observe: 'response'}).pipe(
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

  update(user: IUser): Observable<HttpResponse<User>> {
    return this.http.put<User>(this.resourceUrl, user, {observe: 'response'}).pipe(
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

  find(id: number): Observable<HttpResponse<User>> {
    return this.http.get<User>(`${this.resourceUrl}/${id}`, {observe: 'response'}).pipe(
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
    return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'}).pipe(
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

  getAll(): Observable<HttpResponse<User[]>> {
    return this.http.get<User[]>(this.resourceUrl, {observe: 'response'});
  }

  getAllByIds(ids: Array<number>): Observable<HttpResponse<User[]>> {
    return this.http.post<User[]>(`${this.resourceUrl}/ids`, ids, {observe: 'response'}).pipe(
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
