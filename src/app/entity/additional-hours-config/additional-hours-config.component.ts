import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AdditionalHoursConfig} from "../../model/additional-hours-config.model";
import {AdditionalHoursConfigService} from "../../service/additional-hours-config.service";
import {AdditionalHoursReason} from "../../model/enum/additional-hours-reason.enum";

@Component({
  selector: 'app-additional-hours-config',
  templateUrl: './additional-hours-config.component.html',
  styleUrls: ['./additional-hours-config.component.css']
})
export class AdditionalHoursConfigComponent implements OnInit {

  public additionalHoursReasons: string[] = [];
  additionalHoursConfigId: number;

  additionalHoursConfigCopy: AdditionalHoursConfig;
  additionalHoursConfigValue: AdditionalHoursConfig;

  @Output() additionalHoursConfigChange = new EventEmitter<AdditionalHoursConfig>();

  @Input()
  get additionalHoursConfig(): AdditionalHoursConfig {
    return this.additionalHoursConfigValue;
  }

  set additionalHoursConfig(value: AdditionalHoursConfig) {
    this.additionalHoursConfigValue = value;
    if (this.additionalHoursConfigCopy == null && (this.outsourced || this.additionalHoursConfigId))
      this.additionalHoursConfigCopy = AdditionalHoursConfig.fromAssertion(this.additionalHoursConfigValue);
    this.additionalHoursConfigChange.emit(this.additionalHoursConfig)
  }

  @Output()
  public onConfirm = new EventEmitter<AdditionalHoursConfig>();

  public onConfirmChange() {
    this.additionalHoursConfigCopy = null;
    this.onConfirm.emit(this.additionalHoursConfigValue);
  }

  @Output()
  public onCancel = new EventEmitter<AdditionalHoursConfig>();

  public onCancelChange() {
    this.additionalHoursConfigCopy = null;
    this.onCancel.emit(this.additionalHoursConfigValue);
  }

  @Input()
  public outsourced: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private additionalHoursConfigService: AdditionalHoursConfigService) {

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.additionalHoursConfigId = params['id'];
        this.additionalHoursConfigService.find(this.additionalHoursConfigId).subscribe(response => {
          this.additionalHoursConfig = AdditionalHoursConfig.fromAssertion(response.body);
        }, error => {
        })
      }
    });

    for (let additionalHoursReason in AdditionalHoursReason) {
      this.additionalHoursReasons.push(additionalHoursReason);
    }
  }

  ngOnInit() {
    if (this.additionalHoursConfig == null) {
      this.additionalHoursConfigValue = new AdditionalHoursConfig();
    }
  }

  saveOrUpdate() {
    if (this.additionalHoursConfigCopy) {
      this.additionalHoursConfigService.update(this.additionalHoursConfig).subscribe(response => {
        this.additionalHoursConfig = AdditionalHoursConfig.fromAssertion(response.body);
        window.scrollTo(0, 0);
        this.additionalHoursConfigCopy = AdditionalHoursConfig.fromAssertion(this.additionalHoursConfig);
      }, error => {
      });
    } else {
      this.additionalHoursConfigService.create(this.additionalHoursConfig).subscribe(response => {
        window.scroll(0,0);
        this.clear();
      }, error => {
      });
    }
  }

  update() {
    this.additionalHoursConfigService.update(this.additionalHoursConfig).subscribe(response => {
      window.scrollTo(0, 0);
    }, error => {
    })
  }

  public clear() {
    this.additionalHoursConfig = new AdditionalHoursConfig();
  }

}
