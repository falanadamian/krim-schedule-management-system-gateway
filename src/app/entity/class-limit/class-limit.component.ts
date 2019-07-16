import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClassLimit} from "../../model/class-limit.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassLimitService} from "../../service/class-limit.service";
import {AdditionalHoursConfig} from "../../model/additional-hours-config.model";

@Component({
  selector: 'app-class-limit',
  templateUrl: './class-limit.component.html',
  styleUrls: ['./class-limit.component.css']
})
export class ClassLimitComponent implements OnInit {

  classLimitCopy: ClassLimit;
  classLimitValue: ClassLimit;
  classLimitId: number;

  @Output() classLimitChange = new EventEmitter<ClassLimit>();

  @Input()
  get classLimit(): ClassLimit {
    return this.classLimitValue;
  }

  set classLimit(value: ClassLimit) {
    this.classLimitValue = value;
    if (this.classLimitCopy == null && (this.outsourced || this.classLimitId))
      this.classLimitCopy = ClassLimit.fromAssertion(this.classLimitValue);
    this.classLimitChange.emit(this.classLimit)
  }

  @Output()
  public onConfirm = new EventEmitter<ClassLimit>();

  public onConfirmChange() {
    this.onConfirm.emit(this.classLimitValue);
  }

  @Output()
  public onCancel = new EventEmitter<ClassLimit>();

  public onCancelChange() {
    this.classLimitCopy = null;
    this.onCancel.emit(this.classLimitValue);
  }

  @Input()
  public outsourced: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private classLimitService: ClassLimitService) {

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.classLimitId = params['id'];
        this.classLimitService.find(this.classLimitId).subscribe(response => {
          this.classLimit = ClassLimit.fromAssertion(response.body);
        }, error => {
        })
      }
    });
  }

  ngOnInit() {
    if (this.classLimit == null) {
      this.classLimitValue = new ClassLimit();
    }
  }

  save() {
    this.classLimitService.create(this.classLimit).subscribe(response => {
      window.scrollTo(0, 0);
      this.classLimit = new ClassLimit();
    }, error => {
    })
  }

  saveOrUpdate() {
    if (this.classLimitId) {
      this.classLimitService.update(this.classLimit).subscribe(response => {
        this.classLimit = ClassLimit.fromAssertion(response.body);
        this.classLimitCopy = ClassLimit.fromAssertion(this.classLimit);
        window.scrollTo(0, 0);
      }, error => {
      });
    } else {
      this.classLimitService.create(this.classLimit).subscribe(response => {
        this.classLimit = ClassLimit.fromAssertion(response.body);
        window.scroll(0,0);
        this.clear();
      }, error => {
      });
    }
  }

  update() {
    this.classLimitService.update(this.classLimit).subscribe(response => {
      window.scrollTo(0, 0);
    }, error => {
    })
  }

  public clear() {
    this.classLimit = new ClassLimit();
  }

}
