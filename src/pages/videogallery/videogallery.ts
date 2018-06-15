import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { Gallery, User, GlobalVars } from '../../providers/providers';
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
  selector: 'page-Gallery',
  templateUrl: 'videogallery.html',
})
export class VideogalleryPage {
  currentItems: any;
  AppUserModel: { OrganizationId: any } = {

    OrganizationId: 0
  };
  id: any;
  loadingPopup: any;
  constructor(public currentItemsnavCtrl: NavController,
    public GlobalVars: GlobalVars,
    public navParams: NavParams,
    public Gallery: Gallery,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public user: User,
    private device: Device,
    public menu: MenuController, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {


    this.AppUserModel.OrganizationId = this.GlobalVars.getMyGlobalVar().id;
    this.currentItems = this.navParams.data;
    console.log("One gallery");
    console.log(this.currentItems);
    
    

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OrganizationsPage');

  }
  
  viewDetail(item) {
    this.navCtrl.push("EventsDetailPage", { 'record': item })
  }


}
