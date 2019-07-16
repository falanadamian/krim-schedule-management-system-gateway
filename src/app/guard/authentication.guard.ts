import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {PrincipalService} from "../authentication/principal.service";
import {SessionStorageService} from "../service/session-storage.service";

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private principalService: PrincipalService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const roles = route.data['roles'] || [];
    return this.checkRoles(roles, state.url);
  }

  checkRoles(roles: string[], url: string): Promise<boolean> {
    return Promise.resolve(

    this.principalService.identity().toPromise().then( response => {

      if(!this.principalService.isAuthenticated()){
        this.router.navigate(['authentication/signin'], {
          queryParams: {
            redirectUrl: url
          }
        });
      }

      if (!roles || roles.length === 0) {
        return true;
      }

      SessionStorageService.setURL(url);

      if(response && this.principalService.hasAnyAuthority(roles)) {
        return true;
      }

      if(response) {
        this.router.navigateByUrl('accesdenied');
      } else {
        this.router.navigate(['authentication/signin'], {
          queryParams: {
            redirectUrl: url
          }
        });
      }

      return false;

    }));
  }


}
