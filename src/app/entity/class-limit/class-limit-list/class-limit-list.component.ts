import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClassLimit} from "../../../model/class-limit.model";
import {ColumnDefinition} from "../../../model/column-definition";
import {ClassLimitService} from "../../../service/class-limit.service";
import {SelectionType} from "../../../model/enum/selection-type.enum";

@Component({
  selector: 'app-class-limit-list',
  templateUrl: './class-limit-list.component.html',
  styleUrls: ['./class-limit-list.component.css']
})
export class ClassLimitListComponent implements OnInit {

  public loading: boolean = false;

  public markedClassLimit: ClassLimit;

  public SelectionType = SelectionType;
  @Input() selectionType: SelectionType = SelectionType.NONE;

  classLimits: ClassLimit[] = [];
  selectedClassLimitValue: ClassLimit;

  @Output() selectedClassLimitChange = new EventEmitter<ClassLimit>();

  @Input()
  get selectedClassLimit(): ClassLimit {
    return this.selectedClassLimitValue;
  }

  set selectedClassLimit(classLimit: ClassLimit) {
    this.selectedClassLimitValue = classLimit;
    this.selectedClassLimitChange.emit(this.selectedClassLimitValue);
  }

  columns: ColumnDefinition[];


  constructor(private classLimitService: ClassLimitService) {

    this.columns = [
      new ColumnDefinition("laboratoryClassLimit", "Zajęcia laboratoryjne"),
      new ColumnDefinition("blackboardClassLimit", "Zajęcia tablicowe"),
      new ColumnDefinition("projectClassLimit", "Zajęcia projektowe"),
      new ColumnDefinition("seminarClassLimit", "Zajęcia seminaryjne"),
      new ColumnDefinition("actions", "Akcje"),
    ];
  }

  public loadData() {
    this.loading = true;

    this.classLimitService.getAll().subscribe(response => {
      this.classLimits = response.body.map(classLimit => ClassLimit.fromAssertion(classLimit));
      this.loading = false;
    });
  }

  ngOnInit() {
    this.loadData();
  }

  public mark(rowData: ClassLimit) {
    this.markedClassLimit = rowData;
  }

  public getRow(row: any) {
    let editedClassLimit: ClassLimit = row.data;
    console.dir(editedClassLimit);
    console.dir(row);
  }

  public update() {
    this.classLimitService.update(this.markedClassLimit).subscribe(response => {
      window.scrollTo(0, 0);
      this.loadData();
    });
  }

  public delete() {
    this.classLimitService.delete(this.markedClassLimit.id).subscribe(response => {
      window.scrollTo(0, 0);
      this.loadData();
    });
  }

  public blur(event: any) {
    const triggerEvent = document.createEvent('Event');
    triggerEvent.initEvent('keydown', true, true);
    (<any>triggerEvent).which = (<any>triggerEvent).keyCode = 13;
    event.target.dispatchEvent(triggerEvent);
  }

}
