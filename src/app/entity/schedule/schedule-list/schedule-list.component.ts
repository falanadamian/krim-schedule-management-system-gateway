import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Schedule} from "../../../model/schedule.model";
import {Module} from "../../../model/module.model";
import {SelectItem} from "primeng/api";
import {ColumnDefinition} from "../../../model/column-definition";
import {ScheduleService} from "../../../service/schedule.service";
import {ExamType} from "../../../model/enum/exam-type.enum";
import {SelectionType} from "../../../model/enum/selection-type.enum";
import {User} from "../../../model/user.model";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {

  public SelectionType = SelectionType;
  @Input() selectionType: SelectionType = SelectionType.NONE;

  public loading: boolean = false;
  reloadMarkedUser: boolean = false;

  selectedAssigneeId: number[];

  columns: ColumnDefinition[];

  examTypes: string[] = [];
  examTypeItems: SelectItem[] = [];

  @Input()
  outsourced: boolean = false;

  public markedSchedule: Schedule;

  public scheduleModule: Module;

  schedules: Schedule[] = [];

  selectedScheduleValue: Schedule;

  @Output() selectedScheduleChange = new EventEmitter<Schedule>();

  @Input()
  get selectedSchedule(): Schedule {
    return this.selectedScheduleValue;
  }

  set selectedSchedule(schedule: Schedule) {
    this.selectedScheduleValue = schedule;
    this.selectedScheduleChange.emit(this.selectedScheduleValue);
  }

  scheduleIdsValue: number[];

  @Input()
  set scheduleIds(scheduleIds: number[]) {
    this.scheduleIdsValue = scheduleIds;
  }
  get scheduleIds(): number[] {
    return this.scheduleIdsValue;
  }

  scheduleIdsCopy: number[];

  userItems: SelectItem[] = [];
  selectedResponsibleUser: User = new User();

  users: User[] = [];


  constructor(private scheduleService: ScheduleService,
              private userService: UserService) {

    for (let examType in ExamType) {
      this.examTypeItems.push({label: examType, value: ExamType[examType]});
      this.examTypes.push(examType);
    }
  }

  public loadData() {
    this.loading = true;
    this.schedules = [];

    if(!this.scheduleIds) {
      this.scheduleService.getAll().subscribe(response => {
        this.schedules = response.body.map(schedule => Schedule.fromAssertion(schedule));
        this.markedSchedule = this.schedules[1];
      }).add( () => {
        this.loading = false;
      });
    } else {
      this.scheduleService.getAllByIds(this.scheduleIds).subscribe(response => {
        this.schedules = response.body.map(schedule => Schedule.fromAssertion(schedule));
        this.markedSchedule = this.schedules[1];
        this.scheduleIdsCopy = this.scheduleIds;
      }, error => {
        this.schedules = [];
        this.scheduleIdsCopy = null;
      }).add( () => {
        this.loading = false;
      });
    }

    this.userService.getAll().subscribe( response => {
      this.users = response.body.map(user => User.fromAssertion(user));
      this.userItems = [];
      this.users.forEach( user => {
        this.userItems.push({
          label: user.email,
          value: user.id
        });
      });
    });

  }

  ngOnInit() {

    this.columns = [
      new ColumnDefinition("examType", "Typ egzaminu"),
      new ColumnDefinition("assigneeId", "Prowadzący"),
      new ColumnDefinition("classes.lecture", "W"),
      new ColumnDefinition("classes.laboratory", "L"),
      new ColumnDefinition("classes.blackboard", "C"),
      new ColumnDefinition("classes.project", "P"),
      new ColumnDefinition("classes.seminar", "S"),
      new ColumnDefinition("classes.practical", "Pr"),
      new ColumnDefinition("classes.outdoor", "T"),
      new ColumnDefinition("classes.workshop", "W"),
      new ColumnDefinition("classes.elearning", "E"),
      new ColumnDefinition("classes.other", "I"),
      new ColumnDefinition("actions", "Akcje")
    ];

    if(!this.outsourced) {
      this.columns.push(new ColumnDefinition("assignorId", "Zeznał"));
      this.columns.push(new ColumnDefinition("classes", "Zajęcia"));
      this.columns.push(new ColumnDefinition("errands", "Zlecenia"));
    }

    this.loadData();
  }

  ngOnChanges() {
    if(this.scheduleIds) {
      if(this.scheduleIdsCopy) {
        if(JSON.stringify(this.scheduleIds.sort()) !== JSON.stringify(this.scheduleIdsCopy.sort())) {
          this.loadData();
        }
      } else {
        this.loadData();
      }
    }
  }

  resetReloadMarkedUserFlag() {
    this.reloadMarkedUser = false;
  }

  public mark(rowData: Schedule) {
    this.reloadMarkedUser = true;
    this.markedSchedule = null;
    this.markedSchedule = rowData;
  }

  public update() {
    this.scheduleService.update(this.markedSchedule).subscribe(response => {
      window.scrollTo(0, 0);
      this.loadData();
    });
  }

  public delete() {
    this.scheduleService.delete(this.markedSchedule.id).subscribe(response => {
      window.scrollTo(0, 0);
      this.loadData();
    });
  }

  public getRow(row: any) {
    console.dir(row);
  }

  public onDegreeSelectChange(event: any) {
  }

  onAssigneeChange(event: any) {
    this.markedSchedule.assigneeId = event.value[0];
  }

}
