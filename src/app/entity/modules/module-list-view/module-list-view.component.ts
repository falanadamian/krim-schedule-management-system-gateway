import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColumnDefinition} from "../../../model/column-definition";
import {SelectionType} from "../../../model/enum/selection-type.enum";
import {Module} from "../../../model/module.model";
import {ModuleService} from "../../../service/module.service";
import {ModuleType} from "../../../model/enum/module-type.enum";
import {SelectItem} from "primeng/api";
import {ExamType} from "../../../model/enum/exam-type.enum";
import {UserService} from "../../../service/user.service";
import {Semester} from "../../../model/enum/semester.enum";
import {ClassType} from "../../../model/enum/class-type.enum";

@Component({
  selector: 'app-module-list-view',
  templateUrl: './module-list-view.component.html',
  styleUrls: ['./module-list-view.component.css']
})
export class ModuleListViewComponent implements OnInit {

  public SelectionType = SelectionType;
  public loading: boolean = false;

  @Input() selectionType: SelectionType = SelectionType.NONE;

  @Input() outsourced: boolean = false;

  columns: ColumnDefinition[];

  codeItems: SelectItem[] = [];
  userItems: SelectItem[] = [];
  moduleTypeItems: SelectItem[] = [];
  semesterItems: SelectItem[] = [];
  examTypeItems: SelectItem[] = [];

  modules: Module[] = [];
  selectedModulesValue: Module[] = [];

  @Input()
  loadSelections: boolean = false;

  @Output()
  selectionsReloaded = new EventEmitter<boolean>();

  selectedModulesIdsValue: Array<number> = [];

  @Output() selectedModulesIdsChange = new EventEmitter<Array<number>>();

  @Input()
  get selectedModulesIds(): Array<number> {
    return this.selectedModulesIdsValue;
  }

  set selectedModulesIds(modulesIds: Array<number>) {
    this.selectedModulesIdsValue = modulesIds;
    this.selectedModulesIdsChange.emit(this.selectedModulesIdsValue);
  }





  selectedModuleIdValue: number;

  @Output() selectedModuleIdChange = new EventEmitter<number>();

  @Input()
  get selectedModuleId(): number {
    return this.selectedModuleIdValue;
  }

  set selectedModuleId(moduleId: number) {
    this.selectedModuleIdValue = moduleId;
    this.selectedModuleIdChange.emit(this.selectedModuleIdValue);
  }






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


  constructor(private moduleService: ModuleService, private userService: UserService) {

    this.loadData();

    this.columns = [
      new ColumnDefinition("code", "Kod modułu"),
      new ColumnDefinition("name", "Nazwa"),
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
    ];

    this.semesterItems.push({label: "Wszystkie semestry", value: null});
    this.moduleTypeItems.push({label: "Wszystkie typy", value: null});
    this.examTypeItems.push({label: "Wszystkie typy", value: null});

    for (let semester in Semester) {
      this.semesterItems.push({label: semester, value: Semester[semester]});
    }

    for (let moduleType in ModuleType) {
      this.moduleTypeItems.push({label: moduleType, value: ClassType[moduleType]});
    }

    for (let examType in ExamType) {
      this.examTypeItems.push({label: examType, value: ClassType[examType]});
    }

  }


  ngOnChanges() {
    if (this.loadSelections) {
      if(this.selectionType == SelectionType.CHECKBOX) {
        this.selectedModules = [];

        this.selectedModulesIdsValue.forEach(selectedModuleId => {
          this.selectedModules.push(this.modules.find(module => module.id == selectedModuleId));
        });

        setTimeout(() => {
          this.selectionsReloaded.emit(true);
        }, 100);
      } else if(this.selectionType == SelectionType.RADIOBUTTON) {
        this.selectedModule = this.modules.find( module => module.id == this.selectedModuleIdValue);

        setTimeout(() => {
          this.selectionsReloaded.emit(true);
        }, 100);
      }

    }
  }


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

  public quit(s) {
    s.closeCellEdit();
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

  public mark(rowData: Module) {
    this.selectedModule = rowData;
  }

  onRowSelected(event: any) {
    if(this.selectionType == SelectionType.CHECKBOX) {
      this.selectedModulesIds.push(event.data.id);
    } else if(this.selectionType == SelectionType.RADIOBUTTON){
      this.selectedModuleId = event.data.id;
    }
  }

  onRowUnselected(event: any) {
    if(this.selectionType == SelectionType.CHECKBOX) {
      this.selectedModulesIds = this.selectedModulesIds.filter(id => id != event.data.id);
    }
  }

}
