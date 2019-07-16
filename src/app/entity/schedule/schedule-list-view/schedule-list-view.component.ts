import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ColumnDefinition} from "../../../model/column-definition";
import {SelectItem} from "primeng/api";
import {Schedule} from "../../../model/schedule.model";
import {ScheduleService} from "../../../service/schedule.service";
import {Language} from "../../../model/enum/language.enum";
import {StudyType} from "../../../model/enum/study-type.enum";
import {StudyLevel} from "../../../model/enum/study-level.enum";
import {SelectionType} from "../../../model/enum/selection-type.enum";

@Component({
  selector: 'app-schedule-list-view',
  templateUrl: './schedule-list-view.component.html',
  styleUrls: ['./schedule-list-view.component.css']
})
export class ScheduleListViewComponent implements OnInit {

  public SelectionType = SelectionType;
  public loading: boolean = false;

  columns: ColumnDefinition[];

  codeItems: SelectItem[] = [];
  studyLevelItems: SelectItem[] = [];
  studyTypeItems: SelectItem[] = [];
  lectureLanguageItems: SelectItem[] = [];

  schedules: Schedule[] = [];
  selectedSchedules: Schedule[] = [];

  @Input()
  loadSelections: boolean = false;

  @Output()
  selectionsReloaded = new EventEmitter<boolean>();

  selectedScheduleIdsValue: Array<number> = [];

  @Output() selectedScheduleIdsChange = new EventEmitter<Array<number>>();

  @Input()
  get selectedScheduleIds(): Array<number> {
    return this.selectedScheduleIdsValue;
  }

  set selectedScheduleIds(scheduleIds: Array<number>) {
    this.selectedScheduleIdsValue = scheduleIds;
    this.selectedScheduleIdsChange.emit(this.selectedScheduleIdsValue);
  }

  ngOnChanges() {
    if (this.loadSelections) {
      this.selectedSchedules = [];

      this.selectedScheduleIdsValue.forEach(selectedScheduleId => {
        this.selectedSchedules.push(this.schedules.find(schedule => schedule.id == selectedScheduleId));
      });

      setTimeout(() => {
        this.selectionsReloaded.emit(true);
      }, 100);
    }
  }

  selectedScheduleIdValue: number;

  @Output() selectedScheduleIdChange = new EventEmitter<number>();

  @Input()
  get selectedScheduleId(): number {
    return this.selectedScheduleIdValue;
  }

  set selectedScheduleId(scheduleId: number) {
    this.selectedScheduleIdValue = scheduleId;
    this.selectedScheduleIdChange.emit(this.selectedScheduleIdValue);
  }

  constructor(private scheduleService: ScheduleService) {
    this.loadData();

    this.columns = [
      new ColumnDefinition("examType", "Egzamin"),
      new ColumnDefinition("examType", "Egzamin"),
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

    this.scheduleService.getAll().subscribe(response => {
      this.schedules = response.body.map(schedule => Schedule.fromAssertion(schedule));

      /*this.schedules.forEach(schedule => {
        if (schedule.errand.code) {
          this.codeItems.findIndex(codeItem => codeItem.label == schedule.errand.code) <= -1 ? this.codeItems.push({
            label: schedule.errand.code,
            value: schedule.errand.code
          }) : null;
        }
      });*/
    }).add(() => {
      this.loading = false;
    });
  }

  onRowSelected(event: any) {
    this.selectedScheduleIds.push(event.data.id);
  }

  onRowUnselected(event: any) {
    this.selectedScheduleIds = this.selectedScheduleIds.filter(id => id != event.data.id);
  }

}
