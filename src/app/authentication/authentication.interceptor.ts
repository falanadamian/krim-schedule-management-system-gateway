import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {LocalStorageService} from "../service/local-storage.service";
import {SessionStorageService} from "../service/session-storage.service";
import * as jwt_decode from "jwt-decode";
import {Router} from "@angular/router";
import {SigninService} from "./signin.service";


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private router: Router, private signinService: SigninService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request || !request.url) {
      return next.handle(request);
    }

    const token = LocalStorageService.getJWT() || SessionStorageService.getJWT();

    if (!!token) {
      if(this.decodeToken(token).exp < Date.now()/1000) {
        this.signinService.logout();
        this.router.navigateByUrl('/authentication/signin');
        return null;
      }

      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
        }
      });
    }


    return next.handle(request);
  }

  decodeToken(token: string): any {
    try{
      return jwt_decode(token);
    }
    catch(Error){
      return null;
    }
  }

}

