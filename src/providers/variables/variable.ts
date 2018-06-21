import { Injectable } from '@angular/core';

@Injectable()
export class GlobalVars {
  myGlobalVar: any;
  CompanyView: any = false;
  previousView:string = null;
  constructor() {
    this.myGlobalVar = "";
  }

  setMyGlobalVar(value) {
    // alert(JSON.stringify(value))
    this.myGlobalVar = value;
    //  alert(value.name);

  }

  getMyGlobalVar() {
    return this.myGlobalVar;
  }

}
