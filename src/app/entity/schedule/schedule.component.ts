import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Schedule} from "../../model/schedule.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ScheduleService} from "../../service/schedule.service";
import {ExamType} from "../../model/enum/exam-type.enum";
import {User} from "../../model/user.model";
import {SelectItem} from "primeng/api";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  scheduleCopy: Schedule;
  scheduleValue: Schedule;

  scheduleId: number;

  selectedAssigneeId: number[];

  userItems: SelectItem[] = [];
  selectedResponsibleUser: User = new User();

  users: User[] = [];

  examTypes: string[] = [];

  @Output() scheduleChange = new EventEmitter<Schedule>();

  @Input()
  get schedule(): Schedule {
    return this.scheduleValue;
  }

  set schedule(value: Schedule) {
    this.scheduleValue = value;
    if (this.scheduleCopy == null)
      this.scheduleCopy = Schedule.fromAssertion(this.scheduleValue);
    this.scheduleChange.emit(this.schedule)
  }

  @Output()
  public onConfirm = new EventEmitter<Schedule>();

  public onConfirmChange() {
    this.scheduleCopy = null;
    this.onConfirm.emit(this.scheduleValue);
  }

  @Output()
  public onCancel = new EventEmitter<Schedule>();

  public onCancelChange() {
    this.scheduleCopy = null;
    this.onCancel.emit(this.scheduleValue);
  }

  @Input()
  public outsourced: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private scheduleService: ScheduleService,
              private userService: UserService
  ) {

    this.loadData();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.scheduleId = params['id'];
        this.scheduleService.find(this.scheduleId).subscribe(response => {
          this.schedule = Schedule.fromAssertion(response.body);
        }, error => {
        })
      }
    });

    for (let examType in ExamType) {
      this.examTypes.push(examType);
    }

  }

  ngOnInit() {
    if (this.schedule == null) {
      this.scheduleValue = new Schedule();
    }
  }

  loadData() {

    this.userService.getAll().subscribe( response => {
      this.users = response.body.map(user => User.fromAssertion(user));
      this.users.forEach( user => {
        this.userItems.push({
          label: user.email,
          value: user.id
        });
      });
    });
  }

  saveOrUpdate() {
    if (this.scheduleCopy) {
      this.scheduleService.update(this.schedule).subscribe(response => {
        this.schedule = Schedule.fromAssertion(response.body);
        this.scheduleCopy = Schedule.fromAssertion(this.schedule);
        window.scrollTo(0, 0);
      }, error => {
      });
    } else {
      this.scheduleService.create(this.schedule).subscribe(response => {
        this.clear();
        window.scroll(0, 0);
      }, error => {
      });
    }
  }

  update() {
    this.scheduleService.update(this.schedule).subscribe(response => {
      window.scrollTo(0, 0);
    }, error => {
    })
  }

  public clear() {
    this.schedule = new Schedule();
  }

  onAssigneeChange(event: any) {
    this.schedule.assigneeId = event.value[0];
  }

}
