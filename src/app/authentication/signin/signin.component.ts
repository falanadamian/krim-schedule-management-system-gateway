import {Component, ElementRef, OnInit, Renderer} from '@angular/core';
import {SigninService} from "../signin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SigninForm} from "../../model/signin-form";
import {UserAuthenticationService} from "../user-authentication.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authenticationError: boolean;
  password: string;
  rememberMe: boolean;
  username: string;
  credentials: any;
  redirectUrl: string = '';
  resetPasswordEmail: string = '';

  public forgotPassword: boolean = false;

  constructor(
    private signinService: SigninService,
    private userAuthenticationService: UserAuthenticationService,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.credentials = {};
  }

  ngOnInit() {
    this.route.queryParams.subscribe( queryParams => this.redirectUrl = queryParams['redirectUrl'] || '');
  }

  onSumbit(){}

  public signin() {
    this.signinService
      .signin(new SigninForm(this.username, this.password, this.rememberMe ? this.rememberMe : false)).subscribe( (response: Promise<any> ) => {
          response.then( (res) => {
          this.authenticationError = false;
          if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
            this.router.navigate(['']);
          } else {
            this.router.navigateByUrl(this.redirectUrl);
          }
          });
      },
        error => {
          this.authenticationError = true;
        },
      () => {
      }
    );
  }

  public passwordForgotten() {
    this.forgotPassword = !this.forgotPassword;
  }

  public resetPassword(){
    this.userAuthenticationService.resetPassword(this.resetPasswordEmail).subscribe();
    this.forgotPassword = false;
  }



}
