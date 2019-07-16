import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserAuthenticationService} from "../user-authentication.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public resetKey: string;
  public password: string = '';
  public passwordConfirmation: string = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userAuthenticationService: UserAuthenticationService
  ) {

    this.route.params.subscribe(params => {
      if(params['resetKey']){
        this.resetKey = params['resetKey'];
      }
    });

  }

  public onSubmit() {
    this.userAuthenticationService.completeResetPassword(this.password, this.resetKey).subscribe();
    this.router.navigateByUrl('signin')
  }

  ngOnInit() {
  }

}
