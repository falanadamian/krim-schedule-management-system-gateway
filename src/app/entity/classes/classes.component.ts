import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Classes} from "../../model/classes.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassesService} from "../../service/classes.service";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  classesCopy: Classes;
  classesValue: Classes;
  id: number;

  @Output() classesChange = new EventEmitter<Classes>();

  @Input()
  get classes(): Classes {
    return this.classesValue;
  }

  set classes(value: Classes) {
    this.classesValue = value;
    if (this.classesCopy == null && this.outsourced)
      this.classesCopy = Classes.fromAssertion(this.classesValue);
    this.classesChange.emit(this.classes)
  }

  @Output()
  public onConfirm = new EventEmitter<Classes>();

  public onConfirmChange() {
    this.onConfirm.emit(this.classesValue);
  }

  @Output()
  public onCancel = new EventEmitter<Classes>();

  public onCancelChange() {
    this.classesCopy = null;
    this.onCancel.emit(this.classesValue);
  }

  @Input()
  public outsourced: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private classesService: ClassesService) {

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.classesService.find(params['id']).subscribe(response => {
          this.classes = Classes.fromAssertion(response.body);
          this.classesCopy = Classes.fromAssertion(this.classes);
        }, error => {
        })
      }
    });
  }

  ngOnInit() {
    if (this.classes == null) {
      this.classesValue = new Classes();
    }
  }

  saveOrUpdate() {
    if (this.id) {
      this.classesService.update(this.classes).subscribe(response => {
        this.classes = Classes.fromAssertion(response.body);
        this.classesCopy = Classes.fromAssertion(this.classes);
        window.scrollTo(0, 0);
      }, error => {
      });
    } else {
      this.classesService.create(this.classes).subscribe(response => {
        this.classes = Classes.fromAssertion(response.body);
        window.scroll(0,0);
        this.clear();
        // this.router.navigateByUrl("/classes/" + this.classes.id);
      }, error => {
      });
    }
  }

  update() {
    this.classesService.update(this.classes).subscribe(response => {
      window.scrollTo(0, 0);
    }, error => {
    })
  }

  public clear() {
    this.classes = new Classes();
  }

}
