import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {SelectItem} from "primeng/api";
import {ColumnDefinition} from "../../../model/column-definition";
import {StudyType} from "../../../model/enum/study-type.enum";
import {Language} from "../../../model/enum/language.enum";
import {ModuleGeneralInformation} from "../../../model/module-general-information.model";
import {StudyLevel} from "../../../model/enum/study-level.enum";
import {ModuleGeneralInformationService} from "../../../service/module-general-information.service";
import {SelectionType} from "../../../model/enum/selection-type.enum";

@Component({
  selector: 'app-module-general-information-list-view',
  templateUrl: './module-general-information-list-view.component.html',
  styleUrls: ['./module-general-information-list-view.component.css']
})
export class ModuleGeneralInformationListViewComponent implements OnInit, OnChanges {

  public SelectionType = SelectionType;
  public loading: boolean = false;

  columns: ColumnDefinition[];

  codeItems: SelectItem[] = [];
  studyLevelItems: SelectItem[] = [];
  studyTypeItems: SelectItem[] = [];
  lectureLanguageItems: SelectItem[] = [];

  moduleGeneralInformations: ModuleGeneralInformation[] = [];
  selectedModuleGeneralInformations: ModuleGeneralInformation[] = [];

  @Input()
  loadSelections: boolean = false;

  @Output()
  selectionsReloaded = new EventEmitter<boolean>();

  selectedModuleGeneralInformationIdsValue: Array<number> = [];

  @Output() selectedModuleGeneralInformationIdsChange = new EventEmitter<Array<number>>();

  @Input()
  get selectedModuleGeneralInformationIds(): Array<number> {
    return this.selectedModuleGeneralInformationIdsValue;
  }

  set selectedModuleGeneralInformationIds(moduleGeneralInformationIds: Array<number>) {
    this.selectedModuleGeneralInformationIdsValue = moduleGeneralInformationIds;
    this.selectedModuleGeneralInformationIdsChange.emit(this.selectedModuleGeneralInformationIdsValue);
  }

  ngOnChanges() {
    if (this.loadSelections) {
      this.selectedModuleGeneralInformations = [];

      this.selectedModuleGeneralInformationIdsValue.forEach(selectedModuleGeneralInformationId => {
        this.selectedModuleGeneralInformations.push(this.moduleGeneralInformations.find(moduleGeneralInformation => moduleGeneralInformation.id == selectedModuleGeneralInformationId));
      });

      setTimeout(() => {
        this.selectionsReloaded.emit(true);
      }, 100);
    }
  }

  selectedModuleGeneralInformationIdValue: number;

  @Output() selectedModuleGeneralInformationIdChange = new EventEmitter<number>();

  @Input()
  get selectedModuleGeneralInformationId(): number {
    return this.selectedModuleGeneralInformationIdValue;
  }

  set selectedModuleGeneralInformationId(moduleGeneralInformationId: number) {
    this.selectedModuleGeneralInformationIdValue = moduleGeneralInformationId;
    this.selectedModuleGeneralInformationIdChange.emit(this.selectedModuleGeneralInformationIdValue);
  }

  constructor(private moduleGeneralInformationService: ModuleGeneralInformationService) {
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
      new ColumnDefinition("module", "Moduł"),
    ];

    for (let studyLevel in StudyLevel) {
      this.studyLevelItems.push({label: studyLevel, value: StudyLevel[studyLevel]});
    }

    for (let studyType in StudyType) {
      this.studyTypeItems.push({label: studyType, value: StudyType[studyType]});
    }

    for (let lectureLanguage in Language) {
      this.lectureLanguageItems.push({label: lectureLanguage, value: Language[lectureLanguage]});
    }
  }

  ngOnInit() {
  }

  public loadData() {
    this.loading = true;

    this.moduleGeneralInformationService.getAll().subscribe(response => {
      this.moduleGeneralInformations = response.body.map(moduleGeneralInformation => ModuleGeneralInformation.fromAssertion(moduleGeneralInformation));

      this.moduleGeneralInformations.forEach(moduleGeneralInformation => {
        if (moduleGeneralInformation.code) {
          this.codeItems.findIndex(codeItem => codeItem.label == moduleGeneralInformation.code) <= -1 ? this.codeItems.push({
            label: moduleGeneralInformation.code,
            value: moduleGeneralInformation.code
          }) : null;
        }
      });
    }).add(() => {
      this.loading = false;
    });
  }

  onRowSelected(event: any) {
    this.selectedModuleGeneralInformationIds.push(event.data.id);
  }

  onRowUnselected(event: any) {
    this.selectedModuleGeneralInformationIds = this.selectedModuleGeneralInformationIds.filter(id => id != event.data.id);
  }

}
