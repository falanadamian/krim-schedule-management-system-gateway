import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RoleType} from "../../model/enum/role-type";
import {Degree} from "../../model/enum/degree.enum";
import {Position} from "../../model/enum/position.enum";
import {User} from "../../model/user.model";
import {SelectItem} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/user.service";
import {Role} from "../../model/role";

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public JSON: JSON = JSON;

  public degrees: string[] = [];
  public positions: string[] = [];
  public roleItems: SelectItem[] = [];

  public shouldLoadModulesInChargeover: boolean = false;
  public shouldLoadModulesInManagement: boolean = false;

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

  @Output()
  public onConfirm = new EventEmitter<User>();

  public onConfirmChange(){
    this.updateUser();
    this.userCopy = this.user;
    this.onConfirm.emit(this.userValue);
  }

  @Output()
  public onCancel = new EventEmitter<User>();

  public onCancelChange(){
    this.userCopy = null;
    this.onCancel.emit(this.userValue);
  }

  @Input()
  public outsourced: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService) {

    this.route.params.subscribe(params => {
      if(params['id']){
        this.userService.find(params['id']).subscribe( response => {
          this.user = User.fromAssertion(response.body);
        }, error => {
        })
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

  updateUser() {
    if(this.user.studyInfo.patronId) {
      this.user.studyInfo.userId = this.user.id;
    }
    this.userService.update(this.user).subscribe(response => {
      window.scrollTo(0,0);
    }, error => {
    })
  }

  public loadModulesInChargeover() {
    this.shouldLoadModulesInChargeover = true;
  }

  public loadModulesInManagement() {
    this.shouldLoadModulesInManagement = true;
  }

}
