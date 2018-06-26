import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams, Platform } from 'ionic-angular';
import { Events, User, GlobalVars } from '../../providers/providers';
import { Device } from '@ionic-native/device';
import { MenuController, LoadingController, AlertController } from 'ionic-angular';

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
  loadingPopup: any;
  data: boolean = false;
  constructor(public currentItemsnavCtrl: NavController, public GlobalVars: GlobalVars, public navParams: NavParams,
    public Events: Events,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public user: User,
    private platform: Platform,
    private device: Device,
    public menu: MenuController, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
    this.AppUserModel.OrganizationId = this.GlobalVars.getMyGlobalVar().id;
    if (!user.authenticated) {
      this.navCtrl.push("LoginPage");
    }
    else {
      this.loadingPopup = this.loadingCtrl.create({
        content: 'Processing...'
      });
      this.loadingPopup.present();//Loader
      this.Events.GetCompanyActivity(this.AppUserModel).subscribe((resp: any) => {
        setTimeout(() => {
          this.loadingPopup.dismiss();
        }, 500);

        this.currentItems = resp.data;
        // console.log("all events");
        // console.log(JSON.stringify(this.currentItems));
        if (this.currentItems == null || this.currentItems.length < 1) {
          this.currentItems=null;
          this.data=true;
          // let alert1 = this.alertCtrl.create({
          //   title: 'Message',
          //   subTitle: 'Record not found.',
          //   buttons: ['OK']
          // });
          // alert1.present();
        }
      }, (err) => {

      });
    }

  }

  onclick(item) {
    // console.log("Click event ");
    // console.log(JSON.stringify(item));
    this.navCtrl.push("EventsDetailPage", item);
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad OrganizationsPage');
  }
  ionViewWillLeave() {
    this.loadingPopup.dismiss();
  }
  viewDetail(item) {
    this.navCtrl.push("EventsDetailPage", { 'record': item })
  }


}
