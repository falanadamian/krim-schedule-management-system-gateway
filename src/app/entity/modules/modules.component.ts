import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectItem} from "primeng/api";
import {ModuleService} from "../../service/module.service";
import {Module} from "../../model/module.model";
import {ModuleType} from "../../model/enum/module-type.enum";
import {ColumnDefinition} from "../../model/column-definition";
import {Semester} from "../../model/enum/semester.enum";
import {ClassType} from "../../model/enum/class-type.enum";
import {ExamType} from "../../model/enum/exam-type.enum";
import {User} from "../../model/user.model";
import {UserService} from "../../service/user.service";
import {SelectionType} from "../../model/enum/selection-type.enum";

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css']
})
export class ModulesComponent implements OnInit {

  public SelectionType = SelectionType;
  public loading: boolean = false;

  modules: Module[] = [];

  selectedModulesValue: Module[] = [];

  @Output() selectedModulesChange = new EventEmitter<Module[]>();

  @Input()
  get selectedModules(): Module[] {
    return this.selectedModulesValue;
  }

  set selectedModules(modules: Module[]) {
    this.selectedModulesValue = modules;
    this.selectedModulesChange.emit(this.selectedModulesValue);
  }

  selectedModuleValue: Module;

  @Output() selectedModuleChange = new EventEmitter<Module>();

  @Input()
  get selectedModule(): Module {
    return this.selectedModuleValue;
  }

  set selectedModule(modules: Module) {
    this.selectedModuleValue = modules;
    this.selectedModuleChange.emit(this.selectedModuleValue);
  }

  @Input() selectionType: SelectionType = SelectionType.NONE;

  @Input() outsourced: boolean = false;


  columns: ColumnDefinition[];

  codeItems: SelectItem[] = [];

  userItems: SelectItem[] = [];

  moduleTypeItems: SelectItem[] = [];

  semesterItems: SelectItem[] = [];
  examTypeItems: SelectItem[] = [];

  semesters: string[] = [];
  examTypes: string[] = [];
  classTypes: string[] = [];

  public selectedUserId: number;
  public reloadSelectedUserId: boolean = false;
  selectedUser: User = new User();
  selectedUserCopy: User;

  constructor(private moduleService: ModuleService, private userService: UserService) {

    this.loadData();

    this.columns = [
      new ColumnDefinition("code", "Kod modułu"),
      new ColumnDefinition("name", "Nazwa"),
      // new ColumnDefinition("user", "Opiekun"),
      new ColumnDefinition("type", "Typ"),
      new ColumnDefinition("semester", "Semestr"),
      new ColumnDefinition("examType", "Typ egzaminu"),
      new ColumnDefinition("classes", "Klasy", [
        new ColumnDefinition("lecture", "W"),
        new ColumnDefinition("laboratory", "L"),
        new ColumnDefinition("blackboard", "C"),
        new ColumnDefinition("project", "P"),
        new ColumnDefinition("seminar", "S"),
        new ColumnDefinition("elearning", "E"),
        new ColumnDefinition("other", "I")
      ]),
      new ColumnDefinition("limits", "Limity", [
        new ColumnDefinition("laboratoryClassLimit", "GL"),
        new ColumnDefinition("blackboardClassLimit", "GC"),
        new ColumnDefinition("projectClassLimit", "GP"),
        new ColumnDefinition("seminarClassLimit", "GS"),
      ]),
      new ColumnDefinition("actions", "Akcje")
    ];

    this.semesterItems.push({label: "Wszystkie semestry", value: null});
    this.moduleTypeItems.push({label: "Wszystkie typy", value: null});
    this.examTypeItems.push({label: "Wszystkie typy", value: null});

    for (let semester in Semester) {
      this.semesterItems.push({label: semester, value: Semester[semester]});
      this.semesters.push(semester);
    }

    for (let moduleType in ModuleType) {
      this.moduleTypeItems.push({label: moduleType, value: ClassType[moduleType]});
      this.classTypes.push(moduleType);
    }

    for (let examType in ExamType) {
      this.examTypeItems.push({label: examType, value: ClassType[examType]});
      this.examTypes.push(examType);
    }

  }

  public markUser(rowData: Module) {
    this.reloadSelectedUserId = true;
    this.selectedUserId = null;
    this.selectedUserId = rowData.userId;
    this.userService.find(this.selectedUserId).subscribe(response => {
      this.selectedUser = User.fromAssertion(response.body);
      this.selectedUserCopy = User.fromAssertion(this.selectedUser);
      this.reloadSelectedUserId = false;
    });
  }

  /*public selectUser(selectedUser: User) {
    this.selectedUser = selectedUser;
    this.selectedUserCopy = User.fromAssertion(this.selectedUser);
  }*/

  ngOnInit() {


  }

  loadData() {
    this.loading = true;

    this.moduleService.getAll().subscribe(response => {
      this.modules = response.body.map(module => Module.fromAssertion(module));

      this.modules.forEach(module => {
        this.codeItems.findIndex(codeItem => codeItem.label == module.code) <= -1 ? this.codeItems.push({
          label: module.code,
          value: module.code
        }) : null;
      });

      this.loading = false;
    });
  }

  public getRow(row: any) {
    /*let editedModule: Module = Module.fromAssertion(row.data);
    console.dir(editedModule);*/
    let editedModule: Module = row.data;
    console.dir(editedModule);
    console.dir(row);
  }

  onEditInitialization(row: any) {
    if (row.field == "actions") {
      let editedModule: Module = Module.fromAssertion(row.data);
      console.dir(editedModule);
      console.dir(row);
    }
  }

  public onCancel(row: any) {
    let editedModule: Module = Module.fromAssertion(row.data);
    console.dir(editedModule);
    console.dir(row);
  }

  blur(event: any) {
    // sending enter keypress closes editable cell
    const triggerEvent = document.createEvent('Event');
    triggerEvent.initEvent('keydown', true, true);
    (<any>triggerEvent).which = (<any>triggerEvent).keyCode = 13;
    // send enter keydown event to input field (the target from the blur event)
    event.target.dispatchEvent(triggerEvent);
  }

  public quit(s) {
    s.closeCellEdit();
  }

  public console() {
  }

  public onTypeSelectChange(event: any) {
    console.log(event);
  }

  public onSemesterSelectChange(event: any) {
    console.log(event);
  }

  public onExamTypeSelectChange(event: any) {
    console.log(event);
  }

  public getChildColumns(parentColumn: ColumnDefinition): number {
    if (parentColumn.childColumns) {
    } else {
    }
    return parentColumn.childColumns ? parentColumn.childColumns.length : 0;
  }

  public getDeepestColumnsChildColumnLevel(columns: ColumnDefinition[]): number {
    let counter: number = 1;
    return columns.map(column => this.getDeepestChildColumnLevel(column, counter)).reduce((previous, current) => previous > current ? previous : current);
  }

  public getDeepestChildColumnLevel(column: ColumnDefinition, counter: number): number {
    if (column.childColumns) {
      counter++;
      return column.childColumns.map(childColumn => this.getDeepestChildColumnLevel(childColumn, counter)).reduce((previous, current) => previous > current ? previous : current);
    } else {
      return counter;
    }
  }

  public saveUser(user: User) {
    console.dir(this.selectedUser);
    this.selectedUser = User.reassignFields(this.selectedUser, this.selectedUserCopy);
    this.selectedUserCopy = null;
  }

  public consolecancel() {
    console.dir("cancelled!");
    this.selectedUserCopy = null;
  }

  public mark(rowData: Module) {
    this.selectedModule = rowData;
  }

  public update() {
    this.moduleService.update(this.selectedModule).subscribe(response => {
      window.scrollTo(0, 0);
      this.loadData();
    });
  }

  public delete() {
    this.moduleService.delete(this.selectedModule.id).subscribe(response => {
      window.scrollTo(0, 0);
      this.loadData();
    });
  }

}
