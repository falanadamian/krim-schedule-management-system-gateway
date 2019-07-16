import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Module} from "../../../model/module.model";
import {StudyType} from "../../../model/enum/study-type.enum";
import {ErrandService} from "../../../service/errand.service";
import {ModuleService} from "../../../service/module.service";
import {User} from "../../../model/user.model";
import {Semester} from "../../../model/enum/semester.enum";
import {ExamType} from "../../../model/enum/exam-type.enum";
import {ModuleGeneralInformation} from "../../../model/module-general-information.model";
import {ModuleGeneralInformationService} from "../../../service/module-general-information.service";
import {Errand} from "../../../model/errand.model";
import {Classes} from "../../../model/classes.model";
import {ClassLimit} from "../../../model/class-limit.model";
import {SelectionType} from "../../../model/enum/selection-type.enum";
import {ModuleType} from "../../../model/enum/module-type.enum";


@Component({
  selector: 'module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  public SelectionType = SelectionType;
  public JSON: JSON = JSON;

  public moduleId: number;

  public errandToggled: boolean = false;
  public moduleGeneralInformationToggled: boolean = false;
  public shouldLoadUsers: boolean = false;

  public semesters: string[] = [];
  public examTypes: string[] = [];
  public moduleTypes: string[] = [];

  moduleGeneralInformation: ModuleGeneralInformation;

  moduleCopy: Module;
  moduleValue: Module;

  user: User;

  errandCopy: Module;
  errand: Module;

  @Output() moduleChange = new EventEmitter<Module>();

  @Input()
  get module(): Module {
    return this.moduleValue;
  }

  set module(value: Module) {
    this.moduleValue = value;
    if (this.moduleCopy == null)
      this.moduleCopy = Module.fromAssertion(this.moduleValue);
    this.moduleChange.emit(this.module)
  }

  @Output()
  public onConfirm = new EventEmitter<Module>();

  public onConfirmChange() {
    this.moduleCopy = null;
    this.onConfirm.emit(this.moduleValue);
  }

  @Output()
  public onCancel = new EventEmitter<Module>();

  public onCancelChange() {
    this.moduleCopy = null;
    this.onCancel.emit(this.moduleValue);
  }

  @Input()
  public outsourced: boolean = false;

  constructor(private route: ActivatedRoute,
              private moduleService: ModuleService,
              private errandService: ErrandService,
              private moduleGeneralInformationService: ModuleGeneralInformationService
  ) {

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.moduleService.find(params['id']).subscribe(response => {
          this.module = Module.fromAssertion(response.body);
        }, error => {
        })
      } else {
        this.module = new Module();
        this.module.classes = new Classes();
        this.module.classLimit = new ClassLimit();
        this.module.moduleGeneralInformation = new ModuleGeneralInformation();
      }
    });

    for (let moduleType in ModuleType) {
      this.moduleTypes.push(moduleType);
    }

    for (let semester in Semester) {
      this.semesters.push(semester);
    }

    for (let examType in ExamType) {
      this.examTypes.push(examType);
    }
  }

  ngOnInit() {
    if (this.module == null) {
      this.moduleValue = new Module();
    }
  }

  public onSubmit() {
    if (this.moduleId) {
      this.moduleService.update(this.module).subscribe(response => {
        this.module = Module.fromAssertion(response.body);
        this.moduleCopy = Module.fromAssertion(this.module);
        window.scrollTo(0, 0);
      }, error => {
      });
    } else {
      this.moduleService.create(this.module).subscribe(response => {
        this.module = Module.fromAssertion(response.body);
        window.scroll(0,0);
        this.clear();
      }, error => {
      });
    }
  }

  /*public onSubmit() {
    this.moduleGeneralInformationService.create(this.module.moduleGeneralInformation).subscribe( response => {
      this.module.moduleGeneralInformationId = ModuleGeneralInformation.fromAssertion(response.body).id;
      this.moduleService.create(this.module).subscribe( response => {
        window.scroll(0,0);
        this.clear();
      })
    });
  }*/

  public toggleErrand() {

    if (!this.errand) {
      this.errandService.findByCode(this.module.code).subscribe(response => {
        this.errand = Errand.fromAssertion(response.body);
        this.errandToggled = !this.errandToggled;
        this.moduleGeneralInformationToggled = false;
      })
    }

  }

  public toggleModuleGeneralInformation() {

    this.moduleGeneralInformationService.find(this.module.moduleGeneralInformationId).subscribe(response => {
      this.moduleGeneralInformation = ModuleGeneralInformation.fromAssertion(response.body);
      this.moduleGeneralInformationToggled = !this.moduleGeneralInformationToggled;
      this.errandToggled = false;
    });

  }

  public loadUsers() {
    this.shouldLoadUsers = true;
  }

  public clear() {
    this.module = new Module();
    this.module.classes = new Classes();
    this.module.classLimit = new ClassLimit();
    this.module.moduleGeneralInformation = new ModuleGeneralInformation();
    this.moduleCopy = null;
  }

  public onModuleCodeChange() {
    this.module.moduleGeneralInformation.code = this.module.code;
  }

  public onModuleNameChange() {
    this.module.moduleGeneralInformation.name = this.module.name;
  }

}
