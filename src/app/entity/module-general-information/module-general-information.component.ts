import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModuleGeneralInformation} from "../../model/module-general-information.model";
import {ActivatedRoute} from "@angular/router";
import {ModuleGeneralInformationService} from "../../service/module-general-information.service";
import {StudyLevel} from "../../model/enum/study-level.enum";
import {StudyType} from "../../model/enum/study-type.enum";
import {Language} from "../../model/enum/language.enum";
import {ClassLimit} from "../../model/class-limit.model";

@Component({
  selector: 'app-module-general-information',
  templateUrl: './module-general-information.component.html',
  styleUrls: ['./module-general-information.component.css']
})
export class ModuleGeneralInformationComponent implements OnInit {

  public JSON: JSON = JSON;

  public moduleGeneralInformationId: number;

  public studyLevels: string[] = [];
  public languages: string[] = [];
  public studyTypes: string[] = [];

  moduleGeneralInformationCopy: ModuleGeneralInformation;
  moduleGeneralInformationValue: ModuleGeneralInformation;

  @Output() moduleGeneralInformationChange = new EventEmitter<ModuleGeneralInformation>();

  @Input()
  get moduleGeneralInformation(): ModuleGeneralInformation {
    return this.moduleGeneralInformationValue;
  }

  set moduleGeneralInformation(value: ModuleGeneralInformation) {
    this.moduleGeneralInformationValue = value;
    if (this.moduleGeneralInformationCopy == null)
      this.moduleGeneralInformationCopy = ModuleGeneralInformation.fromAssertion(this.moduleGeneralInformationValue);
    this.moduleGeneralInformationChange.emit(this.moduleGeneralInformation)
  }

  @Output()
  public onConfirm = new EventEmitter<ModuleGeneralInformation>();

  public onConfirmChange() {
    this.moduleGeneralInformationCopy = null;
    this.onConfirm.emit(this.moduleGeneralInformationValue);
  }

  public onSubmit() {
    if (this.moduleGeneralInformationId) {
      this.moduleGeneralInformationService.update(this.moduleGeneralInformation).subscribe(response => {
        this.moduleGeneralInformation = ModuleGeneralInformation.fromAssertion(response.body);
        this.moduleGeneralInformationCopy = ModuleGeneralInformation.fromAssertion(this.moduleGeneralInformation);
        window.scrollTo(0, 0);
      }, error => {
      });
    } else {
      this.moduleGeneralInformationService.create(this.moduleGeneralInformation).subscribe(response => {
        this.moduleGeneralInformation = ModuleGeneralInformation.fromAssertion(response.body);
        window.scroll(0,0);
        this.clear();
      }, error => {
      });
    }
  }

  public clear() {
    this.moduleGeneralInformation = new ModuleGeneralInformation();
  }

  @Output()
  public onCancel = new EventEmitter<ModuleGeneralInformation>();

  public onCancelChange() {
    this.moduleGeneralInformationCopy = null;
    this.onCancel.emit(this.moduleGeneralInformationValue);
  }

  @Input()
  public outsourced: boolean = false;

  constructor(private route: ActivatedRoute, private moduleGeneralInformationService: ModuleGeneralInformationService) {

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.moduleGeneralInformationId = params['id'];
        this.moduleGeneralInformationService.find(this.moduleGeneralInformationId).subscribe(response => {
          this.moduleGeneralInformation = ModuleGeneralInformation.fromAssertion(response.body);
        }, error => {
        })
      }
    });

    for (let studyType in StudyType) {
      this.studyTypes.push(studyType);
    }

    for (let studyLevel in StudyLevel) {
      this.studyLevels.push(studyLevel);
    }

    for (let language in Language) {
      this.languages.push(language);
    }
  }

  ngOnInit() {
    if (this.moduleGeneralInformation == null) {
      this.moduleGeneralInformationValue = new ModuleGeneralInformation();
    }
  }

}
