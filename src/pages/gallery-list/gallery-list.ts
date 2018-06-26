import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams, Platform } from 'ionic-angular';
import { Api, Gallery, User, GlobalVars } from '../../providers/providers';
import { Device } from '@ionic-native/device';
import { MenuController, LoadingController, AlertController } from 'ionic-angular';
/**
 * Generated class for the GalleryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gallery-list',
  templateUrl: 'gallery-list.html',
})
export class GalleryListPage {

  currentItems: [any];
  galleryType = 'regular';
  apiUrl: any;
  AppUserModel: { OrganizationId: any } = {

    OrganizationId: 0
  };
  id: any;
  loadingPopup: any;
  data: boolean = false;
  constructor(public currentItemsnavCtrl: NavController,
    public GlobalVars: GlobalVars,
    public navParams: NavParams,
    public Gallery: Gallery,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public user: User,
    public api: Api,
    private device: Device,
    public menu: MenuController, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private platform: Platform) {

    this.apiUrl = api.url;
    this.AppUserModel.OrganizationId = this.GlobalVars.getMyGlobalVar().id;
    if (!user.authenticated) {
      this.navCtrl.push("LoginPage");
    }
    else {
      this.loadingPopup = this.loadingCtrl.create({
        content: 'Processing...'
      });
      this.loadingPopup.present();//Loader
      this.Gallery.GetCompanyGallery(this.AppUserModel).subscribe((resp: any) => {
        setTimeout(() => {
          this.loadingPopup.dismiss();
        }, 500);

        this.currentItems = resp.data;
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
        else {
          // this.galleryType = this.currentItems[0].galleryName
        }
      }, (err) => {

      });
    }

  }

  onCilck(list) {
    this.navCtrl.push("GalleryPage", list);
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
