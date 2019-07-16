import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModuleGeneralInformation} from "../../../model/module-general-information.model";
import {ColumnDefinition} from "../../../model/column-definition";
import {ModuleGeneralInformationService} from "../../../service/module-general-information.service";
import {SelectItem} from "primeng/api";
import {User} from "../../../model/user.model";
import {UserSignature} from "../../../model/user-signature.model";
import {StudyLevel} from "../../../model/enum/study-level.enum";
import {StudyType} from "../../../model/enum/study-type.enum";
import {Language} from "../../../model/enum/language.enum";
import {Module} from "../../../model/module.model";
import {SelectionType} from "../../../model/enum/selection-type.enum";
import {Errand} from "../../../model/errand.model";
import {ModuleService} from "../../../service/module.service";

@Component({
  selector: 'app-module-general-information-list',
  templateUrl: './module-general-information-list.component.html',
  styleUrls: ['./module-general-information-list.component.css']
})
export class ModuleGeneralInformationListComponent implements OnInit {


  public SelectionType = SelectionType;
  @Input() selectionType: SelectionType = SelectionType.NONE;
  @Input() outsourced: boolean = false;

  public moduleGeneralInformationModule: Module;

  public loading: boolean = false;
  public reloadMarkedModuleGeneralInformation: boolean = false;

  codeItems: SelectItem[] = [];
  responsibleUserSignatureItems: SelectItem[] = [];
  responsibleTeacherItems: SelectItem[] = [];

  studyLevelItems: SelectItem[] = [];
  studyTypeItems: SelectItem[] = [];
  lectureLanguageItems: SelectItem[] = [];

  studyLevels: string[] = [];
  studyTypes: string[] = [];
  lectureLanguages: string[] = [];


  selectedResponsibleTeacher: User = new User();
  selectedResponsibleUserSignature: UserSignature = new UserSignature();

  selectedUser: User = new User();
  selectedUserCopy: User;

  public markedModuleGeneralInformation: ModuleGeneralInformation;

  selectedModuleGeneralInformationsValue: Module[] = [];

  @Output() selectedModuleGeneralInformationsChange = new EventEmitter<Module[]>();

  @Input()
  get selectedModuleGeneralInformations(): Module[] {
    return this.selectedModuleGeneralInformationsValue;
  }

  set selectedModuleGeneralInformations(modules: Module[]) {
    this.selectedModuleGeneralInformationsValue = modules;
    this.selectedModuleGeneralInformationsChange.emit(this.selectedModuleGeneralInformationsValue);
  }

  moduleGeneralInformations: ModuleGeneralInformation[] = [];
  selectedModuleGeneralInformationValue: ModuleGeneralInformation;

  @Output() selectedModuleGeneralInformationChange = new EventEmitter<ModuleGeneralInformation>();

  @Input()
  get selectedModuleGeneralInformation(): ModuleGeneralInformation {
    return this.selectedModuleGeneralInformationValue;
  }

  set selectedModuleGeneralInformation(moduleGeneralInformation: ModuleGeneralInformation) {
    this.selectedModuleGeneralInformationValue = moduleGeneralInformation;
    this.selectedModuleGeneralInformationChange.emit(this.selectedModuleGeneralInformationValue);
  }

  columns: ColumnDefinition[];


  constructor(private moduleGeneralInformationService: ModuleGeneralInformationService, private moduleService: ModuleService) {

    this.loadData();

    this.columns = [
      new ColumnDefinition("name", "Nazwa"),
      new ColumnDefinition("studyCourse", "Rok"),
      new ColumnDefinition("code", "Kod"),
      new ColumnDefinition("faculty", "Wydział"),
      new ColumnDefinition("studyLevel", "Stopień studiów"),
      new ColumnDefinition("studyField", "Kierunek"),
      new ColumnDefinition("semester", "Semestr"),
      new ColumnDefinition("educationProfile", "Profil"),
      new ColumnDefinition("lectureLanguage", "Język"),
      new ColumnDefinition("studyType", "Typ studiów"),
      new ColumnDefinition("responsibleUserSignature", "[S] Pr-y"),
      new ColumnDefinition("academicUserSignatures", "[S] Od-y"),
      new ColumnDefinition("module", "Moduł"),
      new ColumnDefinition("responsibleTeacher", "Od-y"),
      new ColumnDefinition("academicTeachers", "Pr-y"),
      new ColumnDefinition("actions", "Akcje"),
    ];

    for (let studyLevel in StudyLevel) {
      this.studyLevelItems.push({label: studyLevel, value: StudyLevel[studyLevel]});
      this.studyLevels.push(studyLevel);
    }

    for (let studyType in StudyType) {
      this.studyTypeItems.push({label: studyType, value: StudyType[studyType]});
      this.studyTypes.push(studyType);
    }

    for (let lectureLanguage in Language) {
      this.lectureLanguageItems.push({label: lectureLanguage, value: Language[lectureLanguage]});
      this.lectureLanguages.push(lectureLanguage);
    }

  }

  public onStudyTypeSelectChange(event: any) {
    console.log(event);
  }

  public onLanguageSelectChange(event: any) {
    console.log(event);
  }

  public selectUser(selectedUser: User) {
    this.selectedUser = selectedUser;
    this.selectedUserCopy = User.fromAssertion(this.selectedUser);
  }

  public selectResponsibleTeacher(selectedResponsibleTeacher: User) {
    this.selectedResponsibleTeacher = selectedResponsibleTeacher;
    this.selectedUserCopy = User.fromAssertion(this.selectedUser);
  }

  public selectResponsibleUserSignature(selectedResponsibleTeacher: User) {
    this.selectedResponsibleTeacher = selectedResponsibleTeacher;
    this.selectedUserCopy = User.fromAssertion(this.selectedUser);
  }

  public loadData() {
    this.loading = true;

    this.moduleGeneralInformationService.getAll().subscribe(response => {
      this.moduleGeneralInformations = response.body.map(moduleGeneralInformation => ModuleGeneralInformation.fromAssertion(moduleGeneralInformation));

      this.moduleGeneralInformations.forEach(moduleGeneralInformation => {
        if (moduleGeneralInformation.responsibleUserSignature) {
          this.responsibleUserSignatureItems.findIndex(userItem => userItem.label == moduleGeneralInformation.responsibleUserSignature.email) <= -1 ? this.responsibleUserSignatureItems.push({
            label: moduleGeneralInformation.responsibleUserSignature.email,
            value: moduleGeneralInformation.responsibleUserSignature.email
          }) : console.log("null");
        }

        if (moduleGeneralInformation.responsibleTeacher) {
          this.responsibleTeacherItems.findIndex(responsibleTeacherItem => responsibleTeacherItem.label == moduleGeneralInformation.responsibleTeacher.email) <= -1 ? this.responsibleTeacherItems.push({
            label: moduleGeneralInformation.responsibleTeacher.email,
            value: moduleGeneralInformation.responsibleTeacher.email
          }) : null;
        }

        if (moduleGeneralInformation.code) {
          this.codeItems.findIndex(codeItem => codeItem.label == moduleGeneralInformation.code) <= -1 ? this.codeItems.push({
            label: moduleGeneralInformation.code,
            value: moduleGeneralInformation.code
          }) : null;
        }
      });

      this.loading = false;
    });
  }

  ngOnInit() {
  }

  public markModule(rowData: Errand) {
    this.markedModuleGeneralInformation = null;
    this.moduleGeneralInformationModule = null;
    this.markedModuleGeneralInformation = rowData;
    if(this.markedModuleGeneralInformation.moduleId) {
      this.moduleService.find(this.markedModuleGeneralInformation.moduleId).subscribe( response => {
        this.moduleGeneralInformationModule = Module.fromAssertion(response.body);
      })
    }
  }

  public mark(rowData: ModuleGeneralInformation) {
    this.reloadMarkedModuleGeneralInformation = true;
    this.markedModuleGeneralInformation = rowData;
  }

  public getRow(row: any) {
    let editedModuleGeneralInformation: ModuleGeneralInformation = row.data;
    console.dir(editedModuleGeneralInformation);
    console.dir(row);
  }

  public update() {
    this.moduleGeneralInformationService.update(this.markedModuleGeneralInformation).subscribe(response => {
      window.scrollTo(0, 0);
      this.loadData();
    });
  }

  public delete() {
    this.moduleGeneralInformationService.delete(this.markedModuleGeneralInformation.id).subscribe(response => {
      window.scrollTo(0, 0);
      this.loadData();
    });
  }

  public saveUser(user: User) {
    console.dir(this.selectedUser);
    this.selectedUser = User.reassignFields(this.selectedUser, this.selectedUserCopy);
    this.selectedUserCopy = null;
  }

  public blur(event: any) {
    const triggerEvent = document.createEvent('Event');
    triggerEvent.initEvent('keydown', true, true);
    (<any>triggerEvent).which = (<any>triggerEvent).keyCode = 13;
    event.target.dispatchEvent(triggerEvent);
  }

}
