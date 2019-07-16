import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../model/user.model";
import {UserService} from "../../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {Position} from "../../model/enum/position.enum";
import {RoleType} from "../../model/enum/role-type";
import {Role} from "../../model/role";
import {SelectItem} from "primeng/api";
import {Degree} from "../../model/enum/degree.enum";
import {UserAuthenticationService} from "../user-authentication.service";

@Component({
  selector: 'app-user-activation',
  templateUrl: './user-activation.component.html',
  styleUrls: ['./user-activation.component.css']
})
export class UserActivationComponent implements OnInit {

  public JSON: JSON = JSON;

  public degrees: string[] = [];
  public positions: string[] = [];
  public roleItems: SelectItem[] = [];

  userCopy: User;
  userValue: User;

  @Input()
  loading: boolean = false;

  @Output() userChange= new EventEmitter<User>();

  @Input()
  get user(): User {
    return this.userValue;
  }

  set user(value: User) {
    this.userValue = value;
    if(this.userCopy == null)
      this.userCopy = User.fromAssertion(this.userValue);
    this.userChange.emit(this.user)
  }

  public onConfirmChange(){
    this.userCopy = null;
  }

  public onCancelChange(){
    this.userCopy = null;
  }

  constructor(private route: ActivatedRoute, private userAuthenticationService: UserAuthenticationService) {

    this.route.params.subscribe(params => {
      if(params['activationCode']){
        this.userAuthenticationService.activate(params['activationCode']).subscribe(response => {
          this.user = User.fromAssertion(response.body);
        });
      }
    });

    for (let role in RoleType) {
      this.roleItems.push({label: role, value: new Role(<RoleType>RoleType[role])})
    }

    for (let degree in Degree) {
      this.degrees.push(degree);
    }

    for (let position in Position) {
      this.positions.push(position);
    }
  }

  ngOnInit() {
    if(this.user == null){
      this.userValue = new User();
    }
  }

}
