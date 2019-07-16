import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Errand} from "../../model/errand.model";
import {ErrandService} from "../../service/errand.service";
import {Module} from "../../model/module.model";
import {ModuleService} from "../../service/module.service";
import {ClassType} from "../../model/enum/class-type.enum";
import {ClassLimit} from "../../model/class-limit.model";
import {AdditionalHoursConfig} from "../../model/additional-hours-config.model";
import {SelectionType} from "../../model/enum/selection-type.enum";

@Component({
  selector: 'errand',
  templateUrl: './errand.component.html',
  styleUrls: ['./errand.component.css']
})
export class ErrandComponent implements OnInit {

  public SelectionType = SelectionType;
  public JSON: JSON = JSON;
  public moduleToggled: boolean = false;

  public classTypes: string[] = [];

  errandCopy: Errand;
  errandValue: Errand;

  moduleCopy: Module;
  module: Module;

  @Output() errandChange = new EventEmitter<Errand>();

  @Input()
  get errand(): Errand {
    return this.errandValue;
  }

  set errand(value: Errand) {
    this.errandValue = value;
    if (this.errandCopy == null)
      this.errandCopy = Errand.fromAssertion(this.errandValue);
    this.errandChange.emit(this.errand)
  }

  @Output()
  public onConfirm = new EventEmitter<Errand>();

  public onConfirmChange() {
    this.errandCopy = null;
    this.onConfirm.emit(this.errandValue);
  }

  @Output()
  public onCancel = new EventEmitter<Errand>();

  public onCancelChange() {
    this.errandCopy = null;
    this.onCancel.emit(this.errandValue);
  }

  @Input()
  public outsourced: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private errandService: ErrandService,
              private moduleService: ModuleService
  ) {

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.errandService.find(params['id']).subscribe(response => {
          this.errand = Errand.fromAssertion(response.body);
          this.moduleService.find(this.errand.moduleId).subscribe(moduleResponse => {
            this.module = Module.fromAssertion(moduleResponse.body);
          })
        }, error => {
        })
      }
    });

    for (let classType in ClassType) {
      this.classTypes.push(classType);
    }

  }

  ngOnInit() {
    if (this.errand == null) {
      this.errandValue = new Errand();
    }
  }

  saveOrUpdate() {
    if (this.errandCopy) {
      this.errandService.update(this.errand).subscribe(response => {
        this.errand = ClassLimit.fromAssertion(response.body);
        this.errandCopy = ClassLimit.fromAssertion(this.errand);
        window.scrollTo(0, 0);
      }, error => {
      });
    } else {
      if(this.module) {
        this.errand.moduleId = this.module.id;
      }
      this.errandService.create(this.errand).subscribe(response => {
        this.clear();
        window.scroll(0,0);
      }, error => {
      });
    }
  }

  update() {
    this.errandService.update(this.errand).subscribe(response => {
      window.scrollTo(0, 0);
    }, error => {
    })
  }

  public clear() {
    this.errand = new Errand();
  }

  public toggleModule() {
    this.moduleToggled = !this.moduleToggled;
  }

}
