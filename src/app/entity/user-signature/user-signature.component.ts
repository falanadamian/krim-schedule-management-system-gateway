import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserSignature} from "../../model/user-signature.model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserSignatureService} from "../module-general-information/user-signature.service";
import {Degree} from "../../model/enum/degree.enum";
import {ModuleGeneralInformation} from "../../model/module-general-information.model";

@Component({
  selector: 'app-user-signature',
  templateUrl: './user-signature.component.html',
  styleUrls: ['./user-signature.component.css']
})
export class UserSignatureComponent implements OnInit {

  public degrees: string[] = [];

  public shouldLoadModules: boolean = false;

  userSignatureCopy: UserSignature;
  userSignatureValue: UserSignature;

  @Output() userChange = new EventEmitter<UserSignature>();

  @Input()
  get userSignature(): UserSignature {
    return this.userSignatureValue;
  }

  set userSignature(value: UserSignature) {
    this.userSignatureValue = value;
    if (this.userSignatureCopy == null)
      this.userSignatureCopy = UserSignature.fromAssertion(this.userSignatureValue);
    this.userChange.emit(this.userSignature)
  }

  @Output()
  public onConfirm = new EventEmitter<UserSignature>();

  public onConfirmChange() {
    this.userSignatureCopy = null;
    this.onConfirm.emit(this.userSignatureValue);
  }

  @Output()
  public onCancel = new EventEmitter<UserSignature>();

  public onCancelChange() {
    this.userSignatureCopy = null;
    this.onCancel.emit(this.userSignatureValue);
  }

  @Input()
  public outsourced: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private userSignatureService: UserSignatureService) {

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.userSignatureService.find(params['id']).subscribe(response => {
          this.userSignature = UserSignature.fromAssertion(response.body);
        }, error => {
        })
      }
    });

    for (let degree in Degree) {
      this.degrees.push(degree);
    }
  }

  ngOnInit() {
    if (this.userSignature == null) {
      this.userSignatureValue = new UserSignature();
    }
  }

  public loadModulesInCharge() {
    this.shouldLoadModules = true;
    // this.userSignature.modulesInChargeover = this.userSignature.modulesInChargeover.map( moduleInChargeover => ModuleGeneralInformation.fromAssertion(moduleInChargeover));
  }

  public loadModulesInManagement() {
    this.shouldLoadModules = true;
    // this.userSignature.modulesInManagement = this.userSignature.modulesInManagement.map(moduleInManagement => ModuleGeneralInformation.fromAssertion(moduleInManagement));
  }

  saveOrUpdate() {
    if(this.userSignatureCopy){
      this.userSignatureService.update(this.userSignature).subscribe(response => {
        this.userSignature = UserSignature.fromAssertion(response.body);
        this.userSignatureCopy = UserSignature.fromAssertion(response.body);
        window.scrollTo(0, 0);
      }, error => {
      });
    } else {
      this.userSignatureService.create(this.userSignature).subscribe(response => {
        window.scrollTo(0, 0);
        this.userSignature = new UserSignature();
        this.userSignatureCopy = null;
      }, error => {
      });
    }
  }

  update() {
    this.userSignatureService.update(this.userSignature).subscribe(response => {
      window.scrollTo(0, 0);
    }, error => {
    })
  }

  public clear() {
    this.userSignature = new UserSignature();
  }

}
