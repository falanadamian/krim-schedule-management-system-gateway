import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {StudyInfo} from "../../model/study-info.model";
import {ActivatedRoute, Router} from "@angular/router";
import {StudyInfoService} from "../../service/study-info.service";
import {SelectItem} from "primeng/api";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'study-info',
  templateUrl: './study-info.component.html',
  styleUrls: ['./study-info.component.css']
})
export class StudyInfoComponent implements OnInit, OnChanges {

  studyInfoCopy: StudyInfo;
  studyInfoValue: StudyInfo;

  shouldLoadPatron: boolean = false;

  @Output() studyInfoChange = new EventEmitter<StudyInfo>();

  @Input()
  get studyInfo(): StudyInfo {
    return this.studyInfoValue;
  }

  set studyInfo(value: StudyInfo) {
    this.studyInfoValue = value;
    // if (this.studyInfoCopy == null)
    this.studyInfoCopy = StudyInfo.fromAssertion(this.studyInfoValue);
    this.studyInfoChange.emit(this.studyInfo)
  }

  @Output()
  public onConfirm = new EventEmitter<StudyInfo>();

  public onConfirmChange() {
    this.onConfirm.emit(this.studyInfoValue);
  }

  @Output()
  public onCancel = new EventEmitter<StudyInfo>();

  public onCancelChange() {
    this.studyInfoCopy = null;
    this.onCancel.emit(this.studyInfoValue);
  }

  @Input()
  public outsourced: boolean = false;

  public usersIds: number[] = [];
  public usersItems: SelectItem[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private studyInfoService: StudyInfoService, private userService: UserService) {

    this.userService.getAll().subscribe( response => {
      response.body.map( user => {
        this.usersItems.push({
          label: `${user.firstName} ${user.lastName} (${user.identity})`,
          value: user.id
        });
      });

      this.initializeMultiselect();

    })

  }

  public initializeMultiselect() {
    if(this.studyInfo && this.studyInfo.patronId) {
      this.usersIds = [this.studyInfo.patronId];
    }
  }

  ngOnChanges() {
    this.initializeMultiselect();
  }

  ngOnInit() {
    if(!this.outsourced) {
      this.route.params.subscribe(params => {
        if (params['id']) {
          this.studyInfoService.find(params['id']).subscribe(response => {
            this.studyInfo = StudyInfo.fromAssertion(response.body);
          }, error => {
          })
        }
      });
    }

    if (this.studyInfo == null) {
      this.studyInfoValue = new StudyInfo();
    }
  }

  public selectPatron(event: any) {
    this.studyInfo.patronId = event.value[0];
  }

  saveOrUpdate() {
    if (this.studyInfoCopy) {
      this.studyInfoService.update(this.studyInfo).subscribe(response => {
        this.studyInfo = StudyInfo.fromAssertion(response.body);
        this.studyInfoCopy = StudyInfo.fromAssertion(this.studyInfo);
        window.scrollTo(0, 0);
      }, error => {
      });
    } else {
      this.studyInfoService.create(this.studyInfo).subscribe(response => {
        this.studyInfo = StudyInfo.fromAssertion(response.body);
        this.router.navigateByUrl("/studyInfo/" + this.studyInfo.id);
      }, error => {
      });
    }
  }

  update() {
    this.studyInfoService.update(this.studyInfo).subscribe(response => {
      window.scrollTo(0, 0);
    }, error => {
    })
  }

  public clear() {
    this.studyInfo = new StudyInfo();
    this.usersIds = [];
  }

  public loadPatron() {
    this.shouldLoadPatron = true;
  }

}
