import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LimitConfig} from "../../../model/limit-config.model";
import {ColumnDefinition} from "../../../model/column-definition";
import {LimitConfigService} from "../../../service/limit-config.service";
import {SelectionType} from "../../../model/enum/selection-type.enum";

@Component({
  selector: 'app-limit-config-list',
  templateUrl: './limit-config-list.component.html',
  styleUrls: ['./limit-config-list.component.css']
})
export class LimitConfigListComponent implements OnInit {

  public SelectionType = SelectionType;

  public loading: boolean = false;

  public markedLimitConfig: LimitConfig;
  @Input() selectionType: SelectionType = SelectionType.NONE;

  limitConfigs: LimitConfig[] = [];
  selectedLimitConfigValue: LimitConfig;

  @Output() selectedLimitConfigChange = new EventEmitter<LimitConfig>();

  @Input()
  get selectedLimitConfig(): LimitConfig {
    return this.selectedLimitConfigValue;
  }

  set selectedLimitConfig(limitConfig: LimitConfig) {
    this.selectedLimitConfigValue = limitConfig;
    this.selectedLimitConfigChange.emit(this.selectedLimitConfigValue);
  }

  columns: ColumnDefinition[];


  constructor(private limitConfigService: LimitConfigService) {

    this.columns = [
      new ColumnDefinition("partTime", "Część etatu"),
      new ColumnDefinition("fullTime", "Pełny etat (g. żywe)"),
      new ColumnDefinition("fullTimePolish", "Pełny etat (j.pol.)"),
      new ColumnDefinition("fullTimeEnglish", "Pełny etat (j.ang.)"),
      new ColumnDefinition("bachelorThesis", "Praca inż."),
      new ColumnDefinition("masterThesis", "Praca mgr"),
      new ColumnDefinition("hoursForExamPerYear", "Godz. za egzaminy/rok"),
      new ColumnDefinition("physicalHours", "Min. godz. żywych/etat"),
      new ColumnDefinition("actions", "Akcje"),
    ];
  }

  public loadData() {
    this.loading = true;

    this.limitConfigService.getAll().subscribe(response => {
      this.limitConfigs = response.body.map(limitConfig => LimitConfig.fromAssertion(limitConfig));
      this.loading = false;
    });
  }

  ngOnInit() {
    this.loadData();
  }

  public mark(rowData: LimitConfig) {
    this.markedLimitConfig = rowData;
  }

  public getRow(row: any) {
    let editedLimitConfig: LimitConfig = row.data;
    console.dir(editedLimitConfig);
    console.dir(row);
  }

  public update() {
    this.limitConfigService.update(this.markedLimitConfig).subscribe(response => {
      window.scrollTo(0, 0);
      this.loadData();
    });
  }

  public delete() {
    this.limitConfigService.delete(this.markedLimitConfig.id).subscribe(response => {
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
