import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ColumnDefinition} from "../../../model/column-definition";
import {SelectItem} from "primeng/api";
import {Errand} from "../../../model/errand.model";
import {ErrandService} from "../../../service/errand.service";
import {ClassType} from "../../../model/enum/class-type.enum";
import {Module} from "../../../model/module.model";
import {SelectionType} from "../../../model/enum/selection-type.enum";
import {ModuleService} from "../../../service/module.service";

@Component({
  selector: 'app-errand-list',
  templateUrl: './errand-list.component.html',
  styleUrls: ['./errand-list.component.css']
})
export class ErrandListComponent implements OnInit, OnChanges {

  public SelectionType = SelectionType;

  public loading: boolean = false;
  reloadMarkedUser: boolean = false;

  @Input()
  loadSelections: boolean = false;

  columns: ColumnDefinition[];

  classTypes: string[] = [];
  classTypeItems: SelectItem[] = [];

  public markedErrand: Errand;

  public errandModule: Module;

  errands: Errand[] = [];

  selectedErrandValue: Errand;

  @Input()
  errandIds: number[];

  errandIdsCopy: number[];

  @Output() selectedErrandChange = new EventEmitter<Errand>();

  @Input()
  get selectedErrand(): Errand {
    return this.selectedErrandValue;
  }

  set selectedErrand(errand: Errand) {
    this.selectedErrandValue = errand;
    this.selectedErrandChange.emit(this.selectedErrandValue);
  }

  @Input() selectionType: SelectionType = SelectionType.NONE;

  @Input() outsourced: boolean = false;

  constructor(private errandService: ErrandService, private moduleService: ModuleService) {

    this.columns = [
      new ColumnDefinition("classType", "Typ zajęć"),
      new ColumnDefinition("hours", "Liczba godzin"),
      new ColumnDefinition("groups", "Liczba grup"),
      new ColumnDefinition("students", "Liczba studentów"),
      new ColumnDefinition("additionalHoursRatio", "Wsp. g.d."),
      new ColumnDefinition("errandNumber", "Numer zlecenia"),
      new ColumnDefinition("department", "Wydział"),
      new ColumnDefinition("note", "Uwagi"),
      new ColumnDefinition("code", "Kod"),
      new ColumnDefinition("moduleId", "Moduł"),
      new ColumnDefinition("documentId", "Dokument"),
      new ColumnDefinition("scheduleId", "Rozkład zajęć"),
      new ColumnDefinition("actions", "Akcje"),
    ];

    for (let classType in ClassType) {
      this.classTypeItems.push({label: classType, value: ClassType[classType]});
      this.classTypes.push(classType);
    }
  }

  ngOnChanges() {
    if(this.errandIds) {
      if(this.errandIdsCopy) {
        if(JSON.stringify(this.errandIds.sort()) !== JSON.stringify(this.errandIdsCopy.sort())) {
          this.loadData();
        }
      } else {
        this.loadData();
      }
    }

  }

  public loadData() {
    this.loading = true;

    if(!this.errandIds) {
      this.errandService.getAll().subscribe(response => {
        this.errands = response.body.map(errand => Errand.fromAssertion(errand));
        this.markedErrand = this.errands[1];
      }).add( () => {
        this.loading = false;
      });
    } else {
      this.errandService.getAllByIds(this.errandIds).subscribe(response => {
        this.errands = response.body.map(errand => Errand.fromAssertion(errand));
        this.errandIdsCopy = this.errandIds;
        // this.markedErrand = this.errands[1];
      }, error => {
        console.log("error");
      }).add( () => {
        this.loading = false;
      });
    }
  }

  ngOnInit() {
    this.loadData();
  }

  resetReloadMarkedUserFlag() {
    this.reloadMarkedUser = false;
  }

  public mark(rowData: Errand) {
    this.reloadMarkedUser = true;
    this.markedErrand = null;
    this.markedErrand = rowData;
  }

  public markModule(rowData: Errand) {
    this.markedErrand = null;
    this.errandModule = null;
    this.markedErrand = rowData;
    if(this.markedErrand.moduleId) {
      this.moduleService.find(this.markedErrand.moduleId).subscribe( response => {
        this.errandModule = Module.fromAssertion(response.body);
      })
    }
  }

  public update() {
    this.markedErrand.moduleId = this.errandModule ? this.errandModule.id : null;
    this.errandService.update(this.markedErrand).subscribe(response => {
      window.scrollTo(0, 0);
      this.loadData();
    });
  }

  public delete() {
    this.errandService.delete(this.markedErrand.id).subscribe(response => {
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
