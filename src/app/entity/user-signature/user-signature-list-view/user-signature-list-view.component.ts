import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColumnDefinition} from "../../../model/column-definition";
import {SelectItem} from "primeng/api";
import {UserSignature} from "../../../model/user-signature.model";
import {UserSignatureService} from "../../module-general-information/user-signature.service";
import {Degree} from "../../../model/enum/degree.enum";
import {SelectionType} from "../../../model/enum/selection-type.enum";

@Component({
  selector: 'app-user-signature-list-view',
  templateUrl: './user-signature-list-view.component.html',
  styleUrls: ['./user-signature-list-view.component.css']
})
export class UserSignatureListViewComponent implements OnInit {

  public SelectionType = SelectionType;
  public loading: boolean = false;

  columns: ColumnDefinition[];

  degreeItems: SelectItem[] = [];

  userSignatures: UserSignature[] = [];
  selectedUserSignatures: UserSignature[] = [];
  selectedUserSignature: UserSignature;

  @Input() selectionType: SelectionType = SelectionType.NONE;

  @Input()
  loadSelections: boolean = false;

  @Output()
  selectionsReloaded = new EventEmitter<boolean>();

  selectedUserSignatureIdsValue: Array<number> = [];

  @Output() selectedUserSignatureIdsChange = new EventEmitter<Array<number>>();

  @Input()
  get selectedUserSignatureIds(): Array<number> {
    return this.selectedUserSignatureIdsValue;
  }

  set selectedUserSignatureIds(userSignatureIds: Array<number>) {
    this.selectedUserSignatureIdsValue = userSignatureIds;
    this.selectedUserSignatureIdsChange.emit(this.selectedUserSignatureIdsValue);
  }

  ngOnChanges() {
    if (this.loadSelections) {
      this.selectedUserSignatures = [];

      if(this.selectionType == SelectionType.CHECKBOX) {
        this.selectedUserSignatureIdsValue.forEach(selectedUserSignatureId => {
          this.selectedUserSignatures.push(this.userSignatures.find(userSignature => userSignature.id == selectedUserSignatureId));
        });
      } else if(this.selectionType == SelectionType.RADIOBUTTON) {
        this.selectedUserSignature = this.userSignatures.find( userSignature => userSignature.id == this.selectedUserSignatureIdValue);
      }

      setTimeout(() => {
        this.selectionsReloaded.emit(true);
      }, 50);
    }
  }

  selectedUserSignatureIdValue: number;

  @Output() selectedUserSignatureIdChange = new EventEmitter<number>();

  @Input()
  get selectedUserSignatureId(): number {
    return this.selectedUserSignatureIdValue;
  }

  set selectedUserSignatureId(userSignatureId: number) {
    this.selectedUserSignatureIdValue = userSignatureId;
    this.selectedUserSignatureIdChange.emit(this.selectedUserSignatureIdValue);
  }

  constructor(private userSignatureService: UserSignatureService) {
    this.loadData();

    this.columns = [
      new ColumnDefinition("firstName", "Imię"),
      new ColumnDefinition("lastName", "Nazwisko"),
      new ColumnDefinition("email", "Email"),
      new ColumnDefinition("degree", "Tytuł"),
    ];

    for (let degree in Degree) {
      this.degreeItems.push({label: degree, value: Degree[degree]});
    }
  }

  ngOnInit() {
  }

  public loadData() {
    this.loading = true;

    this.userSignatureService.getAll().subscribe(response => {
      this.userSignatures = response.body.map(userSignature => UserSignature.fromAssertion(userSignature));
    }).add(() => {
      this.loading = false;
    });
  }

  onRowSelected(event: any) {
    if(this.selectionType == SelectionType.CHECKBOX) {
      this.selectedUserSignatureIds.push(event.data.id);
    } else if(this.selectionType == SelectionType.RADIOBUTTON) {
      this.selectedUserSignatureId = event.data.id;
    }
  }

  onRowUnselected(event: any) {
    this.selectedUserSignatureIds = this.selectedUserSignatureIds.filter(id => id != event.data.id);
  }

}
