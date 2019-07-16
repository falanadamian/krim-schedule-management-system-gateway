import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColumnDefinition} from "../../../model/column-definition";
import {UserSignature} from "../../../model/user-signature.model";
import {UserSignatureService} from "../../module-general-information/user-signature.service";
import {SelectItem} from "primeng/api";
import {Degree} from "../../../model/enum/degree.enum";
import {SelectionType} from "../../../model/enum/selection-type.enum";

@Component({
  selector: 'app-user-signature-list',
  templateUrl: './user-signature-list.component.html',
  styleUrls: ['./user-signature-list.component.css']
})
export class UserSignatureListComponent implements OnInit {

  public loading: boolean = false;
  reloadMarkedUser: boolean = false;

  columns: ColumnDefinition[];

  degrees: string[] = [];
  degreeItems: SelectItem[] = [];

  public markedUserSignature: UserSignature;

  userSignatures: UserSignature[] = [];

  selectedUserSignatureValue: UserSignature;

  @Output() selectedUserSignatureChange = new EventEmitter<UserSignature>();

  @Input()
  get selectedUserSignature(): UserSignature {
    return this.selectedUserSignatureValue;
  }

  set selectedUserSignature(userSignature: UserSignature) {
    this.selectedUserSignatureValue = userSignature;
    this.selectedUserSignatureChange.emit(this.selectedUserSignatureValue);
  }

  selectedUserSignatureIdValue: number;

  @Output() selectedUserSignatureIdChange = new EventEmitter<number>();

  @Input()
  get selectedUserSignatureId(): number {
    return this.selectedUserSignatureIdValue;
  }

  set selectedUserSignatureId(userId: number) {
    this.selectedUserSignatureIdValue = userId;
    this.selectedUserSignatureIdChange.emit(this.selectedUserSignatureIdValue);
  }

  constructor(private userSignatureService: UserSignatureService) {

    this.loadData();

    this.columns = [
      new ColumnDefinition("firstName", "Imię"),
      new ColumnDefinition("lastName", "Nazwisko"),
      new ColumnDefinition("email", "Email"),
      new ColumnDefinition("degree", "Tytuł"),
      new ColumnDefinition("modulesInChargeover", "Odpowiedzialny za moduły"),
      new ColumnDefinition("modulesInManagement", "Prowadzący moduły"),
      new ColumnDefinition("actions", "Akcje"),
    ];

    for (let degree in Degree) {
      this.degreeItems.push({label: degree, value: Degree[degree]});
      this.degrees.push(degree);
    }
  }

  public loadData() {
    this.loading = true;

    this.userSignatureService.getAll().subscribe(response => {
      this.userSignatures = response.body.map(userSignature => UserSignature.fromAssertion(userSignature));
      this.markedUserSignature = this.userSignatures[1];
      this.loading = false;
    });
  }

  ngOnInit() {
  }

  resetReloadMarkedUserFlag() {
    this.reloadMarkedUser = false;
  }

  public mark(rowData: UserSignature) {
    this.reloadMarkedUser = true;
    this.markedUserSignature = null;
    this.markedUserSignature = rowData;
  }

  public update() {
    this.userSignatureService.update(this.markedUserSignature).subscribe(response => {
      window.scrollTo(0, 0);
      this.loadData();
    });
  }

  public delete() {
    this.userSignatureService.delete(this.markedUserSignature.id).subscribe(response => {
      window.scrollTo(0, 0);
      this.loadData();
    });
  }

  public getRow(row: any) {
    console.dir(row);
  }

  public onDegreeSelectChange(event: any) {
    console.log(event);
  }

}
