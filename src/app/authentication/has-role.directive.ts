/*
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import {PrincipalService} from "./principal.service";

@Directive({
  selector: '[hasRole]'
})
export class HasRole {

  private roles: string[];

  constructor(private principalService: PrincipalService, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {}

  @Input()
  set hasRole(value: string | string[]) {
    this.roles = typeof value === 'string' ? [value] : value;
    this.updateView();
    this.principalService.getAuthenticationState().subscribe(identity => this.updateView());
  }

  private updateView(): void {
    this.viewContainerRef.clear();
    console.log(this.principalService.hasAnyAuthority(this.roles));
    console.log(this.roles);

    if(this.principalService.hasAnyAuthority(this.roles))
        this.viewContainerRef.createEmbeddedView(this.templateRef);
  }

}
*/
