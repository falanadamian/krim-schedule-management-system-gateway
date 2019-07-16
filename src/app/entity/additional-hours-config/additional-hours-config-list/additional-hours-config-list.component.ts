import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdditionalHoursConfig} from "../../../model/additional-hours-config.model";
import {ColumnDefinition} from "../../../model/column-definition";
import {AdditionalHoursConfigService} from "../../../service/additional-hours-config.service";
import {AdditionalHoursReason} from "../../../model/enum/additional-hours-reason.enum";
import {BooleanEnum} from "../../../model/enum/boolean.enum";
import {SelectionType} from "../../../model/enum/selection-type.enum";

@Component({
  selector: 'app-additional-hours-config-list',
  templateUrl: './additional-hours-config-list.component.html',
  styleUrls: ['./additional-hours-config-list.component.css']
})
export class AdditionalHoursConfigListComponent implements OnInit {

  public loading: boolean = false;

  public markedAdditionalHoursConfig: AdditionalHoursConfig;

  public includesLimitOptions: string[] = [];
  public reasons: string[] = [];

  public SelectionType = SelectionType;
  @Input() selectionType: SelectionType = SelectionType.NONE;

  additionalHoursConfigs: AdditionalHoursConfig[] = [];
  selectedAdditionalHoursConfigValue: AdditionalHoursConfig;

  @Output() selectedAdditionalHoursConfigChange = new EventEmitter<AdditionalHoursConfig>();

  @Input()
  get selectedAdditionalHoursConfig(): AdditionalHoursConfig {
    return this.selectedAdditionalHoursConfigValue;
  }

  set selectedAdditionalHoursConfig(additionalHoursConfig: AdditionalHoursConfig) {
    this.selectedAdditionalHoursConfigValue = additionalHoursConfig;
    this.selectedAdditionalHoursConfigChange.emit(this.selectedAdditionalHoursConfigValue);
  }

  columns: ColumnDefinition[];


  constructor(private additionalHoursConfigService: AdditionalHoursConfigService) {

    this.columns = [
      new ColumnDefinition("reason", "Powód"),
      new ColumnDefinition("coefficient", "Wspołczynnik"),
      new ColumnDefinition("includesLimit", "Uwzględnia limity"),
      new ColumnDefinition("note", "Uwagi"),
      new ColumnDefinition("actions", "Akcje"),
    ];

    for (let reason in AdditionalHoursReason) {
      this.reasons.push(reason);
    }

    for (let booleanOption in BooleanEnum) {
      this.includesLimitOptions.push(booleanOption);
    }
  }

  public loadData() {
    this.loading = true;

    this.additionalHoursConfigService.getAll().subscribe(response => {
      this.additionalHoursConfigs = response.body.map(additionalHoursConfig => AdditionalHoursConfig.fromAssertion(additionalHoursConfig));
      this.loading = false;
    });
  }

  ngOnInit() {
    this.loadData();
  }

  public mark(rowData: AdditionalHoursConfig) {
    this.markedAdditionalHoursConfig = rowData;
  }

  public getRow(row: any) {
    let editedAdditionalHoursConfig: AdditionalHoursConfig = row.data;
    console.dir(editedAdditionalHoursConfig);
    console.dir(row);
  }

  public update() {
    this.additionalHoursConfigService.update(this.markedAdditionalHoursConfig).subscribe(response => {
      window.scrollTo(0, 0);
      this.loadData();
    });
  }

  public delete() {
    this.additionalHoursConfigService.delete(this.markedAdditionalHoursConfig.id).subscribe(response => {
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
