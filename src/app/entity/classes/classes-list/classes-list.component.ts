import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Classes} from "../../../model/classes.model";
import {ColumnDefinition} from "../../../model/column-definition";
import {ClassesService} from "../../../service/classes.service";
import {SelectionType} from "../../../model/enum/selection-type.enum";

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.css']
})
export class ClassesListComponent implements OnInit {

  public SelectionType = SelectionType;
  @Input() selectionType: SelectionType = SelectionType.NONE;
  @Input() outsourced: boolean = false;

  public loading: boolean = false;

  public markedClasses: Classes;

  classes: Classes[] = [];
  selectedClassesValue: Classes;

  @Output() selectedClassesChange = new EventEmitter<Classes>();

  @Input()
  get selectedClasses(): Classes {
    return this.selectedClassesValue;
  }

  set selectedClasses(classes: Classes) {
    this.selectedClassesValue = classes;
    this.selectedClassesChange.emit(this.selectedClassesValue);
  }

  columns: ColumnDefinition[];


  constructor(private classesService: ClassesService) {

    this.columns = [
      new ColumnDefinition("lecture", "Wykład"),
      new ColumnDefinition("laboratory", "Laboratoria"),
      new ColumnDefinition("blackboard", "Tablicowe"),
      new ColumnDefinition("project", "Projektowe"),
      new ColumnDefinition("seminar", "Seminaria"),
      new ColumnDefinition("practical", "Praktyczne"),
      new ColumnDefinition("outdoor", "Terenowe"),
      new ColumnDefinition("workshop", "Warsztaty"),
      new ColumnDefinition("elearning", "Elearning"),
      new ColumnDefinition("other", "Inne"),
      new ColumnDefinition("sum", "Suma"),
      new ColumnDefinition("actions", "Akcje"),
    ];
  }

  public loadData() {
    this.loading = true;

    this.classesService.getAll().subscribe(response => {
      this.classes = response.body.map(classes => Classes.fromAssertion(classes));
      this.loading = false;
    });
  }

  ngOnInit() {
    this.loadData();
  }

  public mark(rowData: Classes) {
    this.markedClasses = rowData;
  }

  public getRow(row: any) {
    let editedClasses: Classes = row.data;
    console.dir(editedClasses);
    console.dir(row);
  }

  public update() {
    this.classesService.update(this.markedClasses).subscribe(response => {
      window.scrollTo(0, 0);
      this.loadData();
    });
  }

  public delete() {
    this.classesService.delete(this.markedClasses.id).subscribe(response => {
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
