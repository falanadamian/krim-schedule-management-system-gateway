import { Component, OnInit } from '@angular/core';
import {Message} from "primeng/api";
import {ScrapperService} from "../service/scrapper.service";
import {Module} from "../model/module.model";

@Component({
  selector: 'app-scrapper',
  templateUrl: './scrapper.component.html',
  styleUrls: ['./scrapper.component.css']
})
export class ScrapperComponent implements OnInit {

  public scrapperOptions: Array<string>;
  public verificationOptions: Array<string>;
  public selectedScrapperOption: string;
  public selectedVerificationOption: string;
  public scrapperUrls: Array<string>;

  constructor(private scrapperService: ScrapperService) {
    this.scrapperOptions = [
      "Wydział",
      "Kierunek",
      "Przedmiot"
    ];

    this.verificationOptions = [
      "Wszystkie",
      "Istniejące"
    ];

    this.scrapperUrls = [
      "",
    ]

  }

  /*onWS() {
    this.scrapperService.sendMessage("heya");
  }*/

  onWSinit() {
    this.scrapperService.initializeWebSocketConnection();
  }

  ngOnInit() {
  }

  activeIndex: number = 0;
  reachedIndex: number = 0;
  firstName: string;
  lastName: string;
  address: string;

  msgs: Message[] = [];

  next() {
    this.activeIndex++;
    this.reachedIndex = this.activeIndex;
  }

  onInitializationNext() {
    this.activeIndex++;
    this.reachedIndex = this.activeIndex;
    this.scrapperService.sendMessage(this.scrapperUrls[0]);
    /*this.scrapperService.getCourseVerifyDuplicate(this.scrapperUrls).subscribe( response => {
      console.dir(response);
      let courseModules: Module[] = response.body.map( module => Module.fromAssertion(module));
      console.dir(courseModules);
    });*/
  }

  get readonly(): boolean {
    return false;
  }

  ok() {
    this.activeIndex = 0;
  }

  onChange(label: string) {
    this.msgs.length = 0;
    this.msgs.push({severity: 'info', summary: label});
  }

  public deleteScrapperUrl(scrapperUrl: string): void {
    const index = this.scrapperUrls.indexOf(scrapperUrl, 0);
    if (index > -1) {
      this.scrapperUrls.splice(index, 1);
    }
  }

  public addScrapperUrl(): void {
    this.scrapperUrls.push("");
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}
