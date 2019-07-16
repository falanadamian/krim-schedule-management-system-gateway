import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Position} from "../../model/enum/position.enum";
import {ActivatedRoute, Router} from "@angular/router";
import {UserConfigService} from "../../service/user-config.service";
import {UserConfig} from "../../model/user-config.model";

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent implements OnInit {

  public positions: string[] = [];

  userConfigCopy: UserConfig;
  userConfigValue: UserConfig;

  @Output() userChange = new EventEmitter<UserConfig>();

  @Input()
  get userConfig(): UserConfig {
    return this.userConfigValue;
  }

  set userConfig(value: UserConfig) {
    this.userConfigValue = value;
    if (this.userConfigCopy == null)
      this.userConfigCopy = UserConfig.fromAssertion(this.userConfigValue);
    this.userChange.emit(this.userConfig)
  }

  @Output()
  public onConfirm = new EventEmitter<UserConfig>();

  public onConfirmChange() {
    this.userConfigCopy = null;
    this.onConfirm.emit(this.userConfigValue);
  }

  @Output()
  public onCancel = new EventEmitter<UserConfig>();

  public onCancelChange() {
    this.userConfigCopy = null;
    this.onCancel.emit(this.userConfigValue);
  }

  @Input()
  public outsourced: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private userConfigService: UserConfigService) {

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userConfigService.find(params['id']).subscribe(response => {
          this.userConfig = UserConfig.fromAssertion(response.body);
        }, error => {
        })
      }
    });

    for (let position in Position) {
      this.positions.push(position);
    }
  }

  ngOnInit() {
    if (this.userConfig == null) {
      this.userConfigValue = new UserConfig();
    }
  }

  saveOrUpdate() {
    if(this.userConfigCopy){
      this.userConfigService.update(this.userConfig).subscribe(response => {
        this.userConfig = UserConfig.fromAssertion(response.body);
        this.userConfigCopy = UserConfig.fromAssertion(response.body);
        window.scrollTo(0, 0);
      }, error => {
      });
    } else {
      this.userConfigService.create(this.userConfig).subscribe(response => {
        window.scrollTo(0, 0);
        this.userConfig = new UserConfig();
        this.userConfigCopy = null;
      }, error => {
      });
    }
  }

  update() {
    this.userConfigService.update(this.userConfig).subscribe(response => {
      window.scrollTo(0, 0);
    }, error => {
    })
  }

  public clear() {
    this.userConfig = new UserConfig();
  }

}
