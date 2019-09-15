import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  private barcodesSource: BehaviorSubject<Array<{code: string; name: string}>> = new BehaviorSubject([]);

  private arrCode: Array<string> = [];
  private name: Array<string> = [];
  private codesArr: Array<{code: string; name: string}> = [];

  constructor() { }

  addCode(value: {code: string; name: string}) {

    if (!this.arrCode.includes(value.code)) {
      this.arrCode.push(value.code);
      this.codesArr.push(value);
    }

    this.barcodesSource.next(this.codesArr);
  }

  get codes() {
    return this.barcodesSource.asObservable();
  }
}
