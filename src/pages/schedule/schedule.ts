import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams, Platform } from 'ionic-angular';

import { Schedule, User, GlobalVars } from '../../providers/providers';
import { Device } from '@ionic-native/device';
import { MenuController, LoadingController, AlertController } from 'ionic-angular';
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
  currentItems: any = null;
  AppUserModel: { OrganizationId: any } = {
    OrganizationId: 0
  };
  loadingPopup: any;
  data: boolean = false;
  constructor(public currentItemsnavCtrl: NavController, public navParams: NavParams,
    public Schedule: Schedule,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public user: User,
    public GlobalVars: GlobalVars,
    private device: Device,
    public menu: MenuController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform) {
    if (!user.authenticated) {
      this.navCtrl.push("LoginPage");
    }
    else {
      this.AppUserModel.OrganizationId = this.GlobalVars.getMyGlobalVar().id;
      this.loadingPopup = this.loadingCtrl.create({
        content: 'Processing...'
      });
      this.loadingPopup.present();//Loader
      this.Schedule.GetCompanySchedule(this.AppUserModel).subscribe((resp: any) => {

        this.currentItems = resp.data;
        setTimeout(() => {
          this.loadingPopup.dismiss();
        }, 500);
        if (this.currentItems == null || this.currentItems.length < 1 ) {
          this.data = true;
          this.currentItems=null;
        }
      }, (err) => {

      });
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }
  ionViewWillLeave() {
    this.loadingPopup.dismiss();
  }
  viewDetail(item) {
    this.navCtrl.push("ScheduleDetailPage", { 'record': item })
  }
}
