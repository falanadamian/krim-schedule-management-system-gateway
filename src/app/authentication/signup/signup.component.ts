import {Component, ElementRef, OnInit, Renderer} from '@angular/core';
import {SignupService} from "../signup.service";
import {SignupForm} from "../signup-form";
import {Position} from "../../model/enum/position.enum";
import {Degree} from "../../model/enum/degree.enum";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  confirmPassword: string;
  doNotMatch: string;
  error: string;
  errorEmailExists: string;
  errorUserExists: string;
  signupForm: SignupForm;
  success: boolean;
  public degrees: string[] = [];
  public positions: string[] = [];


  constructor(
    private signupService: SignupService,
    private elementRef: ElementRef,
    private renderer: Renderer
  ) {

    for (let degree in Degree) {
      this.degrees.push(degree);
    }

    for (let position in Position) {
      this.positions.push(position);
    }

  }

  ngOnInit() {
    this.success = false;
    this.signupForm = SignupForm.getEmptySignupForm();
  }

  onSubmit() {

    if (this.signupForm.password !== this.confirmPassword) {
      this.doNotMatch = 'ERROR';
    } else {
      this.doNotMatch = null;
      this.error = null;
      this.errorUserExists = null;
      this.errorEmailExists = null;
      this.signupService.save(this.signupForm).subscribe(
        (response) => {
          this.success = true;
        },
        response => console.log("process errror", response)
      );
    }
  }

}
