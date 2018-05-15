import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

@Injectable()
export class News {

  constructor(public api: Api) { }

  GetCompanyNews() {
  //  alert(params)
    return this.api.post('api/gurudwaraservices/GetCompanyNews',null).share();
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
