import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {PrincipalService} from "../../authentication/principal.service";
import {SigninService} from "../../authentication/signin.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCollapsed: boolean;

  sidebarExpandedValue: boolean = false;

  @Output()
  sidebarExpandedChange = new EventEmitter<boolean>();

  @Input()
  get sidebarExpanded(): boolean {
    return this.sidebarExpandedValue;
  }

  set sidebarExpanded(sidebarExpanded: boolean){
    this.sidebarExpandedValue = sidebarExpanded;
    this.sidebarExpandedChange.emit(this.sidebarExpandedValue);
  }

  public toggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpandedValue;
  }


  constructor(
    private signinService: SigninService,
    private principalService: PrincipalService,
    private router: Router
  ) {
    this.isCollapsed = false;
  }

  ngOnInit() {
  }

  collapseNavbar() {
    this.isCollapsed = true;
  }

  toggleNavbar() {
    this.isCollapsed = !this.isCollapsed;
  }

  isAuthenticated() {
    return this.principalService.isAuthenticated();
  }

  logout() {
    this.collapseNavbar();
    this.signinService.logout();
    this.router.navigateByUrl('/authentication/signin');
  }

}
