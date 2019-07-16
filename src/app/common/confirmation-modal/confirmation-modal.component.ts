import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {

  @Input()
  public id: string;

  @Input()
  public header: string;

  @Input()
  public description: string;

  @Input()
  public closeDescription: string = "Zamknij";

  @Input()
  public confirmDescription: string;

  @Output()
  public onConfirm = new EventEmitter();

  public onConfirmChange(){
    this.onConfirm.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
