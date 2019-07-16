import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SignupForm} from "./signup-form";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class SignupService {

  private signupURL: string = 'http://localhost:8080/krim/authentication/signup';

  constructor(private http: HttpClient) {}

  save(signupForm: SignupForm): Observable<any> {
    return this.http.post(this.signupURL, signupForm, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), observe: 'response' });
  }
}
