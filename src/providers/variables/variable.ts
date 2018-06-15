import {Injectable} from '@angular/core';

@Injectable()
export class GlobalVars {
  myGlobalVar :any;
   myCompanyName :any;
  constructor() {
    this.myGlobalVar = "";
  }

  setMyGlobalVar(value) {
   // alert(JSON.stringify(value))
    this.myGlobalVar = value;
  //  alert(value.name);
    this.myCompanyName=value.name;
  }

  getMyGlobalVar() {
    return this.myGlobalVar;
  }

}
