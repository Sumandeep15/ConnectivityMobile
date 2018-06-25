import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers';

/**
 * Generated class for the ServicesDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-services-details',
  templateUrl: 'services-details.html',
})
export class ServicesDetailsPage {
  curentItem: any;
  apiURL: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api) {
    this.apiURL = api.url;
    this.curentItem = this.navParams.data;
    console.log(this.apiURL+this.curentItem);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesDetailsPage');
  }

}
