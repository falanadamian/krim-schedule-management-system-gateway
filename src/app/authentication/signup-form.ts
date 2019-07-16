import {User} from "../model/user.model";

export class SignupForm extends User {

  public static getEmptySignupForm(){
    return new SignupForm();
  }
}
