import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {UserConfigService} from "../../../service/user-config.service";
import {ColumnDefinition} from "../../../model/column-definition";
import {SelectionType} from "../../../model/enum/selection-type.enum";
import {UserConfig} from "../../../model/user-config.model";

@Component({
  selector: 'user-config-list-view',
  templateUrl: './user-config-list-view.component.html',
  styleUrls: ['./user-config-list-view.component.css']
})
export class UserConfigListViewComponent implements OnInit, OnChanges {

  public SelectionType = SelectionType;
  @Input() selectionType: SelectionType = SelectionType.NONE;

  @Input() outsourced: boolean = false;

  public loading: boolean = false;

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

  ngOnChanges() {
    if(this.selectedUserConfig && this.userConfigs.length > 0) {
      let index = this.userConfigs.findIndex(userConfig => userConfig.position == this.selectedUserConfig.position);
      this.selectedUserConfig = this.userConfigs[index];
    }
  }

  constructor(private userConfigService: UserConfigService) {

    this.columns = [
      new ColumnDefinition("position", "Stanowisko"),
      new ColumnDefinition("pensum", "Pensum"),
      new ColumnDefinition("pensumLimit", "Pensum Limit"),
      new ColumnDefinition("overtimeRateFullTime", "Nadgodziny stawka stacjonarne"),
      new ColumnDefinition("overtimeRatePartTime", "Nadgodziny stawka niestacjonarne"),
    ];

    this.loadData();
  }

  public loadData() {
    this.loading = true;

    this.userConfigService.getAll().subscribe(response => {
      this.userConfigs = response.body.map(userConfig => UserConfig.fromAssertion(userConfig));
      this.loading = false;
    });
  }

  ngOnInit() {
  }

}
