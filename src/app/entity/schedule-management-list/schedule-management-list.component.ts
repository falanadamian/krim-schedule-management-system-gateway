import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Schedule} from "../../model/schedule.model";
import {User} from "../../model/user.model";
import {SelectItem} from "primeng/api";
import {SelectionType} from "../../model/enum/selection-type.enum";
import {ColumnDefinition} from "../../model/column-definition";
import {Module} from "../../model/module.model";
import {ScheduleService} from "../../service/schedule.service";
import {UserService} from "../../service/user.service";
import {ExamType} from "../../model/enum/exam-type.enum";

@Component({
  selector: 'app-schedule-management-list',
  templateUrl: './schedule-management-list.component.html',
  styleUrls: ['./schedule-management-list.component.css']
})
export class ScheduleManagementListComponent implements OnInit {

  public loading: boolean = false;

  columns: ColumnDefinition[];

  examTypeItems: SelectItem[] = [];

  schedules: Schedule[] = [];

  users: User[] = [];

  constructor(private scheduleService: ScheduleService,
              private userService: UserService) {

    for (let examType in ExamType) {
      this.examTypeItems.push({label: examType, value: ExamType[examType]});
    }
  }

  ngOnInit() {

    this.columns = [
      new ColumnDefinition("examType", "Typ egzaminu"),
      new ColumnDefinition("assignorId", "Zeznał"),
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
      // new ColumnDefinition("actions", "Akcje")
    ];

    this.loadData();
  }

  public loadData() {
    this.loading = true;
    this.schedules = [];

    this.scheduleService.getAllForCurrentlyLoggedInUser().subscribe(response => {
      let assignorIds: number[] = [];

      this.schedules = response.body.map(schedule => {
        assignorIds.push(schedule.assigneeId);
        return Schedule.fromAssertion(schedule)
      });


      this.userService.getAllByIds(assignorIds).subscribe( response => {
        this.users = response.body.map(user => User.fromAssertion(user));
        this.schedules.map( schedule => schedule.assignor = this.users.find(user => user.id == schedule.assignorId));
      });

    }).add( () => {
      this.loading = false;
    });


  }

}
