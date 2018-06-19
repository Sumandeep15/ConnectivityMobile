import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the NotificationsDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications-details',
  templateUrl: 'notifications-details.html',
})
export class NotificationsDetailsPage {
  curentItem: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform) {
    this.curentItem = this.navParams.data;

   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsDetailsPage');
  }

}
