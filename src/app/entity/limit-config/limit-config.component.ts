import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LimitConfig} from "../../model/limit-config.model";
import {ActivatedRoute, Router} from "@angular/router";
import {LimitConfigService} from "../../service/limit-config.service";

@Component({
  selector: 'app-limit-config',
  templateUrl: './limit-config.component.html',
  styleUrls: ['./limit-config.component.css']
})
export class LimitConfigComponent implements OnInit {

  limitConfigCopy: LimitConfig;
  limitConfigValue: LimitConfig;

  @Output() limitConfigChange = new EventEmitter<LimitConfig>();

  @Input()
  get limitConfig(): LimitConfig {
    return this.limitConfigValue;
  }

  set limitConfig(value: LimitConfig) {
    this.limitConfigValue = value;
    if (this.limitConfigCopy == null)
      this.limitConfigCopy = LimitConfig.fromAssertion(this.limitConfigValue);
    this.limitConfigChange.emit(this.limitConfig)
  }

  @Output()
  public onConfirm = new EventEmitter<LimitConfig>();

  public onConfirmChange() {
    this.limitConfigCopy = null;
    this.onConfirm.emit(this.limitConfigValue);
  }

  @Output()
  public onCancel = new EventEmitter<LimitConfig>();

  public onCancelChange() {
    this.limitConfigCopy = null;
    this.onCancel.emit(this.limitConfigValue);
  }

  @Input()
  public outsourced: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private limitConfigService: LimitConfigService) {

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.limitConfigService.find(params['id']).subscribe(response => {
          this.limitConfig = LimitConfig.fromAssertion(response.body);
        }, error => {
        })
      }
    });

  }

  ngOnInit() {
    if (this.limitConfig == null) {
      this.limitConfigValue = new LimitConfig();
    }
  }

  saveOrUpdate() {
    if(this.limitConfigCopy) {
      this.limitConfigService.update(this.limitConfig).subscribe(response => {
        this.limitConfig = LimitConfig.fromAssertion(response.body);
        this.limitConfigCopy = LimitConfig.fromAssertion(response.body);
        window.scrollTo(0, 0);
      }, error => {
      });
    } else {
      this.limitConfigService.create(this.limitConfig).subscribe(response => {
        window.scrollTo(0, 0);
        this.limitConfig = new LimitConfig();
        this.limitConfigCopy = null;
      }, error => {
      });
    }
  }

  update() {
    this.limitConfigService.update(this.limitConfig).subscribe(response => {
      window.scrollTo(0, 0);
    }, error => {
    })
  }

  public clear() {
    let clearLimitConfig = new LimitConfig();
    clearLimitConfig.id = this.limitConfig.id;
    this.limitConfig = clearLimitConfig;
  }

}
