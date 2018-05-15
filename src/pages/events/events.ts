import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { Events, User } from '../../providers/providers';
import { Device } from '@ionic-native/device';
import * as $ from 'jquery';
/**
 * Generated class for the OrganizationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  currentItems: any;
  AppUserModel: { OrganizationId: any } = {

    OrganizationId: 0
  };
  id: any;
  constructor(public currentItemsnavCtrl: NavController, public navParams: NavParams,
    public Events: Events,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public user: User,

    private device: Device) {
    this.AppUserModel.OrganizationId = this.navParams.get('id');
    if (!user.authenticated) {
      this.navCtrl.push("LoginPage");
    }
    else {
      this.Events.GetCompanyActivity(this.AppUserModel).subscribe((resp: any) => {
        this.currentItems = resp.data;
      }, (err) => {

      });
    }

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OrganizationsPage');
  }

  viewDetail(item) {
    this.navCtrl.push("EventsDetailPage", { 'record': item })
  }


}
