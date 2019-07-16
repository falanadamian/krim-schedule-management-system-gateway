import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IModule, Module} from "../model/module.model";
import * as Stomp from 'stompjs'
import * as SockJS from 'sockjs-client'

type EntityResponseType = HttpResponse<IModule>;
type EntityArrayResponseType = HttpResponse<Module[]>;

@Injectable({providedIn: 'root'})
export class ScrapperService {

  public resourceUrl = 'http://localhost:8080/krim/scrapper';

  public serverUrl = 'http://localhost:8080/socket';

  private title = 'Websocket scrapper';

  private stompClient;

  constructor(private http: HttpClient) {
  }

  public initializeWebSocketConnection(){
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let self = this;
    this.stompClient.connect({}, function(frame) {
      self.stompClient.subscribe("/chat", (message) => {
        if(message) {
          console.log("stomp client message is", message);
        }
      });
    });
  }

  public sendMessage(message) {
    this.stompClient.send("/app/send/message", {}, message);
  }

  create(module: IModule): Observable<EntityResponseType> {
    return this.http.post<IModule>(this.resourceUrl, module, {observe: 'response'});
  }

  update(module: IModule): Observable<EntityResponseType> {
    return this.http.put<IModule>(this.resourceUrl, module, {observe: 'response'});
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IModule>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  getCourseVerifyDuplicate(urls: Array<string>): Observable<EntityArrayResponseType> {
    return this.http.post<Module[]>(this.resourceUrl + "/course/verify/duplicate", urls, {observe: 'response'});
  }

  getCourseVerifyAll(urls: Array<string>): Observable<EntityArrayResponseType> {
    return this.http.post<Module[]>(this.resourceUrl + "/course/verify/all", urls, {observe: 'response'})/*.pipe(
      map((response) => {
        return new HttpResponse<Module[]>().clone({
          body: response.body.map(module => Module.fromJson(module)),
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
          url: response.url
        });
      }),
      catchError((error) => {
        console.log(error);
        return of(false);
      }),
      finalize(() => console.log("this.stopLoading()"))
    )*/;
  }

}
