import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../model/user.model";
import {SelectionType} from "../../../model/enum/selection-type.enum";
import {UserService} from "../../../service/user.service";
import {ModuleService} from "../../../service/module.service";
import {ColumnDefinition} from "../../../model/column-definition";
import {SelectItem} from "primeng/api";
import {Module} from "../../../model/module.model";
import {Degree} from "../../../model/enum/degree.enum";
import {RoleType} from "../../../model/enum/role-type";
import {Position} from "../../../model/enum/position.enum";
import {Role} from "../../../model/role";
import {UserConfig} from "../../../model/user-config.model";
import {Errand} from "../../../model/errand.model";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public SelectionType = SelectionType;
  @Input() selectionType: SelectionType = SelectionType.NONE;

  @Input() outsourced: boolean = false;

  public loading: boolean = false;

  public shouldLoadModulesInChargeover: boolean = false;
  public shouldLoadModulesInManagement: boolean = false;

  columns: ColumnDefinition[];

  degrees: string[] = [];
  degreeItems: SelectItem[] = [];

  positions: string[] = [];
  positionItems: SelectItem[] = [];

  roleTypes: string[] = [];
  roleTypeItems: SelectItem[] = [];

  selectedRoleTypes: Role[] = [];

  public markedUser: User;

  public userModulesInChargeover: Module[];

  users: User[] = [];

  selectedUserValue: User;

  @Output() selectedUserChange = new EventEmitter<User>();

  @Input()
  get selectedUser(): User {
    return this.selectedUserValue;
  }

  set selectedUser(user: User) {
    this.selectedUserValue = user;
    this.selectedUserChange.emit(this.selectedUserValue);
  }

  constructor(private userService: UserService, private moduleService: ModuleService) {

    this.loadData();

    this.columns = [
      new ColumnDefinition("firstName", "Imię"),
      new ColumnDefinition("lastName", "Nazwisko"),
      new ColumnDefinition("identity", "Id"),
      new ColumnDefinition("username", "Username"),
      new ColumnDefinition("email", "Email"),
      new ColumnDefinition("degree", "Stopień"),
      new ColumnDefinition("roles", "Role"),
      new ColumnDefinition("reduction", "Redukcja"),
      new ColumnDefinition("note", "Notka"),
      new ColumnDefinition("position", "Stanowisko"),
      new ColumnDefinition("studyInfo", "Studia"),
      new ColumnDefinition("config", "Config"),
      new ColumnDefinition("modulesInChargeovesIds", "Odpowiedzialny"),
      new ColumnDefinition("modulesInManagementIds", "Prowadzi"),
      new ColumnDefinition("actions", "Akcje"),
    ];

    for (let degree in Degree) {
      this.degreeItems.push({label: degree, value: Degree[degree]});
      this.degrees.push(degree);
    }

    for (let position in Position) {
      this.positionItems.push({label: position, value: Position[position]});
      this.positions.push(position);
    }

    for (let roleType in RoleType) {
      this.roleTypeItems.push({label: roleType, value: new Role(<RoleType>RoleType[roleType])});
      this.roleTypes.push(roleType);
    }
  }

  public loadData() {
    this.loading = true;

    this.userService.getAll().subscribe(response => {
      this.users = response.body.map(user => User.fromAssertion(user));
      this.markedUser = this.users[1];
      this.loading = false;
    });
  }

  ngOnInit() {
  }

  public mark(rowData: User) {
    this.markedUser = null;
    this.markedUser = rowData;
  }

  public update() {

    // this.markedUser.moduleId = this.userModule.id;
    this.userService.update(this.markedUser).subscribe(response => {
      window.scrollTo(0, 0);
      this.loadData();
    });
  }

  public delete() {
    this.userService.delete(this.markedUser.id).subscribe(response => {
      window.scrollTo(0, 0);
      this.loadData();
    });
  }

  public markModulesInChargeover(rowData: Errand) {
    this.markedUser = null;
    this.userModulesInChargeover = null;
    this.markedUser = rowData;
    if(this.markedUser.modulesInChargeovesIds && this.markedUser.modulesInChargeovesIds.length > 0) {
      this.moduleService.getAllByIds(this.markedUser.modulesInChargeovesIds).subscribe( response => {
        this.userModulesInChargeover = response.body.map( module => Module.fromAssertion(module));
      })
    }
  }

  public getRow(row: any) {
    console.dir(row);
  }

  public onDegreeSelectChange(event: any) {
    console.log(event);
  }

  public onRoleSelectChange(event: any) {
    console.log(event);
  }

  public onPositionSelectChange(event: any) {
    console.log(event);
  }

  public loadModulesInChargeover() {
    this.shouldLoadModulesInChargeover = true;
  }

  public loadModulesInManagement() {
    this.shouldLoadModulesInManagement = true;
  }

}
