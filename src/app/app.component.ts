import {Component, ElementRef, Renderer2} from '@angular/core';
import {PrincipalService} from "./authentication/principal.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'krim-sms-gateway';

  sidebarExpanded: boolean = true;

  constructor(private principalService: PrincipalService) {
  }

  ngOnInit() {
  }

  hasRoles(roles: string[]): boolean {
    return this.principalService.hasAnyAuthority(roles);
  }
}
