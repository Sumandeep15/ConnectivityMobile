import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';

import { Schedule,User } from '../../providers/providers';
import { Device } from '@ionic-native/device';
/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
  currentItems: any;
  AppUserModel: { OrganizationId: any } = {
    OrganizationId: 0
  };
  constructor(public currentItemsnavCtrl: NavController, public navParams: NavParams,
    public Schedule: Schedule,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
 public user: User,

    private device: Device) {
    if (!user.authenticated) {
      this.navCtrl.push("LoginPage");
    }
    else {
      this.AppUserModel.OrganizationId = this.navParams.get('id');
      this.Schedule.GetCompanySchedule(this.AppUserModel).subscribe((resp: any) => {
        this.currentItems = resp.data;
      }, (err) => {

      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }
  viewDetail(item) {
    this.navCtrl.push("ScheduleDetailPage", { 'record': item })
  }
}
