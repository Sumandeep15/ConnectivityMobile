import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { Api, Gallery, User, GlobalVars } from '../../providers/providers';
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
  templateUrl: 'Gallery.html',
})
export class GalleryPage {
  currentItems: [any];
  apiUrl: any;
  loadingPopup: any;
  apiurl: any;
  constructor(public GlobalVars: GlobalVars,
    public navParams: NavParams,
    public Gallery: Gallery,
    public navCtrl: NavController,
    public api: Api) {
      
    this.currentItems = this.navParams.data;
    console.log(JSON.stringify(this.currentItems));
    this.apiUrl = api.url;
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OrganizationsPage');
  }
  viewDetail(item) {
    this.navCtrl.push("EventsDetailPage", { 'record': item })
  }


}
