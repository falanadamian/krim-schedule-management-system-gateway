import {Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, SimpleChanges} from '@angular/core';
import {MenuItem} from "primeng/api";
import {StepComponent} from "../step/step.component";

@Component({
  selector: 'steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() activeIndex: number = 0;

  @Input()
  public reachedIndex: number = 0;
  @Input()
  public stepsNumber: number = 0;
  @Output() activeIndexChange: EventEmitter<any> = new EventEmitter();
  @Output() reachedIndexChange: EventEmitter<any> = new EventEmitter();
  @Output() change = new EventEmitter();

  items: MenuItem[] = [];

  @ContentChildren(StepComponent) steps: QueryList<StepComponent>;

  ngAfterContentInit() {
    this.steps.toArray().forEach((step: StepComponent, index: number) => {

      if (index === this.activeIndex) {
        // show this step on init
        step.active = true;
      }

      this.items[index] = {
        label: step.label,
        disabled: index > this.reachedIndex,
        command: (event: any) => {
          // hide all steps
          this.steps.toArray().forEach((s: StepComponent) => s.active = false);

          // show the step the user has clicked on.
          step.active = true;
          this.activeIndex = index;

          // emit currently selected index (two-way binding)
          this.reachedIndexChange.emit(this.reachedIndex);
          this.activeIndexChange.emit(index);
          // emit currently selected label
          this.change.next(step.label);
        }
      };
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.steps) {
      // we could also check changes['activeIndex'].isFirstChange()
      return;
    }

    for (let change in changes) {
      if (change === 'activeIndex') {
        let curIndex = changes[change].currentValue;
        this.steps.toArray().forEach((step: StepComponent, index: number) => {
          // show / hide the step
          let selected = index === curIndex;
          step.active = selected;

          this.items[index].disabled = index > this.reachedIndex;

          if (selected) {
            // emit currently selected label
            this.change.next(step.label);
          }
        });
      }
    }
  }

  public previous() {
    this.activeIndex--;
    // emit currently selected index (two-way binding)
    this.activeIndexChange.emit(this.activeIndex);
    // show / hide steps and emit selected label
    this.ngOnChanges({
      activeIndex: {
        currentValue: this.activeIndex,
        previousValue: this.activeIndex + 1,
        firstChange: false,
        isFirstChange: () => false
      }
    });
  }

  public next() {
    this.activeIndex++;
    this.reachedIndex = this.activeIndex > this.reachedIndex ? this.activeIndex : this.reachedIndex;
    // emit currently selected index (two-way binding)
    this.activeIndexChange.emit(this.activeIndex);
    this.reachedIndexChange.emit(this.reachedIndex);
    // show / hide steps and emit selected label
    this.ngOnChanges({
      activeIndex: {
        currentValue: this.activeIndex,
        previousValue: this.activeIndex + -1,
        firstChange: false,
        isFirstChange: () => false
      }
    });
  }

  public edit() {
    this.reachedIndex = this.activeIndex;
    this.reachedIndexChange.emit(this.reachedIndex);
    this.activeIndexChange.emit(this.activeIndex);
    this.ngOnChanges({
      activeIndex: {
        currentValue: this.activeIndex,
        previousValue: this.activeIndex + -1,
        firstChange: false,
        isFirstChange: () => false
      }
    });
  }

}
