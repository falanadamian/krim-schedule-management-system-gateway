import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  @Input()
  label: string;

  active: boolean = false;

  lolololo: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
