import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColumnDefinition} from "../../../model/column-definition";
import {UserConfig} from "../../../model/user-config.model";
import {UserConfigService} from "../../../service/user-config.service";
import {SelectionType} from "../../../model/enum/selection-type.enum";

@Component({
  selector: 'user-config-list',
  templateUrl: './user-config-list.component.html',
  styleUrls: ['./user-config-list.component.css']
})
export class UserConfigListComponent implements OnInit {

  public SelectionType = SelectionType;
  @Input() selectionType: SelectionType = SelectionType.NONE;

  @Input() outsourced: boolean = false;

  public loading: boolean = false;

  public markedUserConfig: UserConfig;

  userConfigs: UserConfig[] = [];
  selectedUserConfigValue: UserConfig;

  @Output() selectedUserConfigChange = new EventEmitter<UserConfig>();

  @Input()
  get selectedUserConfig(): UserConfig {
    return this.selectedUserConfigValue;
  }

  set selectedUserConfig(userConfig: UserConfig) {
    this.selectedUserConfigValue = userConfig;
    this.selectedUserConfigChange.emit(this.selectedUserConfigValue);
  }

  columns: ColumnDefinition[];


  constructor(private userConfigService: UserConfigService) {

    this.columns = [
      new ColumnDefinition("position", "Stanowisko"),
      new ColumnDefinition("pensum", "Pensum"),
      new ColumnDefinition("pensumLimit", "Pensum Limit"),
      new ColumnDefinition("overtimeRateFullTime", "Nadgodziny stawka stacjonarne"),
      new ColumnDefinition("overtimeRatePartTime", "Nadgodziny stawka niestacjonarne"),
      new ColumnDefinition("actions", "Akcje"),
    ];
  }

  public loadData() {
    this.loading = true;

    this.userConfigService.getAll().subscribe(response => {
      this.userConfigs = response.body.map(userConfig => UserConfig.fromAssertion(userConfig));
      this.loading = false;
    });
  }

  ngOnInit() {
    this.loadData();
  }

  public mark(rowData: UserConfig) {
    this.markedUserConfig = rowData;
  }

  public getRow(row: any) {
    let editedUserConfig: UserConfig = row.data;
    console.dir(editedUserConfig);
    console.dir(row);
  }

  public update() {
    this.userConfigService.update(this.markedUserConfig).subscribe(response => {
      window.scrollTo(0, 0);
      this.loadData();
    });
  }

  public delete() {
    this.userConfigService.delete(this.markedUserConfig.position).subscribe(response => {
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
