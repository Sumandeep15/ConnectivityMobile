import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController , NavParams} from 'ionic-angular';

import { News } from '../../providers/providers';
import { Device } from '@ionic-native/device';
/**
 * Generated class for the SchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
    currentItems: any;
 AppUserModel: { OrganizationId: any } = {
    OrganizationId:0
  };
  constructor(public currentItemsnavCtrl: NavController, public navParams: NavParams,
    public News: News,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,

    private device: Device) {
     this.AppUserModel.OrganizationId = this.navParams.get('id');

    this.News.GetCompanyNews().subscribe((resp: any) => {
      this.currentItems = resp.data;
    }, (err) => {

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }

}
