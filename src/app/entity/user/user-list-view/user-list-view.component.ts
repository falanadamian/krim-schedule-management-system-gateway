import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColumnDefinition} from "../../../model/column-definition";
import {Role} from "../../../model/role";
import {SelectionType} from "../../../model/enum/selection-type.enum";
import {Module} from "../../../model/module.model";
import {ModuleService} from "../../../service/module.service";
import {SelectItem} from "primeng/api";
import {Degree} from "../../../model/enum/degree.enum";
import {Position} from "../../../model/enum/position.enum";
import {RoleType} from "../../../model/enum/role-type";
import {UserService} from "../../../service/user.service";
import {User} from "../../../model/user.model";

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.css']
})
export class UserListViewComponent implements OnInit {

  public SelectionType = SelectionType;
  @Input() selectionType: SelectionType = SelectionType.NONE;

  @Input() outsourced: boolean = false;

  @Input()
  loadSelections: boolean = false;

  @Output()
  selectionsReloaded = new EventEmitter<boolean>();

  public loading: boolean = false;

  columns: ColumnDefinition[];

  degrees: string[] = [];
  degreeItems: SelectItem[] = [];

  positions: string[] = [];
  positionItems: SelectItem[] = [];

  roleTypes: string[] = [];
  roleTypeItems: SelectItem[] = [];

  selectedRoleTypes: Role[] = [];

  public markedUser: User;

  public userModule: Module;

  users: User[] = [];

  selectedUsers: User[] = [];

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

  selectedUsersIdsValue: Array<number> = [];

  @Output() selectedUsersIdsChange = new EventEmitter<Array<number>>();

  @Input()
  get selectedUsersIds(): Array<number> {
    return this.selectedUsersIdsValue;
  }

  set selectedUsersIds(usersIds: Array<number>) {
    this.selectedUsersIdsValue = usersIds;
    this.selectedUsersIdsChange.emit(this.selectedUsersIdsValue);
  }

  selectedUserIdValue: number;

  @Output() selectedUserIdChange = new EventEmitter<number>();

  @Input()
  get selectedUserId(): number {
    return this.selectedUserIdValue;
  }

  set selectedUserId(userId: number) {
    this.selectedUserIdValue = userId;
    this.selectedUserIdChange.emit(this.selectedUserIdValue);
  }

  ngOnChanges() {
    if (this.loadSelections) {
      this.selectedUsers = [];

      if(this.selectionType == SelectionType.CHECKBOX) {
        this.selectedUsersIdsValue.forEach(selectedUserId => {
          this.selectedUsers.push(this.users.find(user => user.id == selectedUserId));
        });

      } else if(this.selectionType == SelectionType.RADIOBUTTON) {
        this.selectedUser = this.users.find( user => user.id == this.selectedUserIdValue);
          // this.selectedUsers.push(this.users.find(user => user.id == this.selectedUserIdValue));
      }
    }
    setTimeout(() => {
      this.selectionsReloaded.emit(true);
    }, 50);
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
    ];

    for (let degree in Degree) {
      this.degreeItems.push({label: degree, value: Degree[degree]});
    }

    for (let position in Position) {
      this.positionItems.push({label: position, value: Position[position]});
    }

    for (let roleType in RoleType) {
      this.roleTypeItems.push({label: roleType, value: new Role(<RoleType>RoleType[roleType])});
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

  public markUserConfig(rowData: User) {
    this.markedUser = null;
    this.userModule = null;
    this.markedUser = rowData;
    if (this.markedUser.moduleId) {
      this.moduleService.find(this.markedUser.moduleId).subscribe(response => {
        this.userModule = Module.fromAssertion(response.body);
      })
    }
  }

  onRowSelected(event: any) {
    if(this.selectionType == SelectionType.CHECKBOX) {
      this.selectedUsersIds.push(event.data.id);
    } else if(this.selectionType == SelectionType.RADIOBUTTON) {
      this.selectedUserId = event.data.id;
    }
  }

  onRowUnselected(event: any) {
    this.selectedUsersIds = this.selectedUsersIds.filter(id => id != event.data.id);
  }

}
