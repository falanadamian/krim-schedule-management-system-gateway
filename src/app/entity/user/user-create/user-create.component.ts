import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {Role} from "../../../model/role";
import {SelectItem} from "primeng/api";
import {Degree} from "../../../model/enum/degree.enum";
import {Position} from "../../../model/enum/position.enum";
import {User} from "../../../model/user.model";
import {RoleType} from "../../../model/enum/role-type";
import {ActivatedRoute, Router} from "@angular/router";
import {SelectionType} from "../../../model/enum/selection-type.enum";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  public SelectionType = SelectionType;

  public degrees: string[] = [];
  public positions: string[] = [];
  public roleItems: SelectItem[] = [];

  userValue: User;

  @Output() userChange = new EventEmitter<User>();

  @Input()
  get user(): User {
    return this.userValue;
  }

  set user(value: User) {
    this.userValue = value;
    this.userChange.emit(this.user)
  }

  @Output()
  public onConfirm = new EventEmitter<User>();

  public onConfirmChange() {
    this.onConfirm.emit(this.userValue);
  }

  @Output()
  public onCancel = new EventEmitter<User>();

  public onCancelChange() {
    this.onCancel.emit(this.userValue);
  }

  @Input()
  public outsourced: boolean = false;

  public shouldLoadModulesInChargeover: boolean = false;
  public shouldLoadModulesInManagement: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {

    this.user = new User();

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
  }

  clear() {
    this.user = new User();
  }

  save() {
    if(this.user.studyInfo.patronId) {
      this.user.studyInfo.userId = this.user.id;
    }
    this.userService.create(this.user).subscribe(response => {
      window.scrollTo(0,0);
      this.user = new User();
      // this.redirectTo(this.route.snapshot.url.join());
    }, error => {
    })
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => this.router.navigate([uri]));
  }

  public loadModulesInChargeover() {
    this.shouldLoadModulesInChargeover = true;
  }

  public loadModulesInManagement() {
    this.shouldLoadModulesInManagement = true;
  }

}
