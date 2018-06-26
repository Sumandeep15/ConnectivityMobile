import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams, Platform } from 'ionic-angular';
import { Gallery, User, GlobalVars } from '../../providers/providers';
import { Device } from '@ionic-native/device';
import { MenuController, LoadingController, AlertController } from 'ionic-angular';
import { Jsonp } from '@angular/http';

/**
 * Generated class for the VideogalleryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-videogallery-list',
  templateUrl: 'videogallery-list.html',
})
export class VideogalleryListPage {
  currentItems: any;
  AppUserModel: { OrganizationId: any } = {

    OrganizationId: 0
  };
  id: any;
  loadingPopup: any;
  data: boolean = false;
  constructor(public currentItemsnavCtrl: NavController, public GlobalVars: GlobalVars, public navParams: NavParams,
    public Gallery: Gallery,
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
      this.Gallery.GetCompanyVideoGallery(this.AppUserModel).subscribe((resp: any) => {
        setTimeout(() => {
          this.loadingPopup.dismiss();
        }, 500);

        this.currentItems = resp.data;
        // console.log("VideoGalleryList");
        // console.log(JSON.stringify(this.currentItems));

        if (this.currentItems == null || this.currentItems.length < 1) {
          this.data = true;
          this.currentItems = null;
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

  onClick(list) {
    this.navCtrl.push("VideogalleryPage", list);
    // console.log(JSON.stringify(list));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrganizationsPage');

  }
  ionViewWillLeave() {
    this.loadingPopup.dismiss();
  }
  viewDetail(item) {
    this.navCtrl.push("EventsDetailPage", { 'record': item })
  }


}
