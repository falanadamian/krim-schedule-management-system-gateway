import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'common-modal',
  templateUrl: './common-modal.component.html',
  styleUrls: ['./common-modal.component.css']
})
export class CommonModalComponent implements OnInit {

  @ContentChild(TemplateRef)
  @Input() layoutTemplate: TemplateRef<any>;

  @Input()
  public id: string;

  @Input()
  public header: string;

  constructor() { }

  ngOnInit() {
  }

}
