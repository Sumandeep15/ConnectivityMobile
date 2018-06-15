import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { Events, Api } from '../../providers/providers';
import { Device } from '@ionic-native/device';
/**
 * Generated class for the EventsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-events-detail',
  templateUrl: 'events-detail.html',
})

export class EventsDetailPage {
  currentItem: any;
  apiUrl;
  AppUserModel:any;
  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
    private api:Api) {
    this.AppUserModel = this.navParams.data;
    // this.Events.GetCompanyActivity(this.AppUserModel).subscribe((resp: any) => {
    this.currentItem = this.AppUserModel;
    this.apiUrl=api.url;
    console.log("current event")
    console.log(this.currentItem);
    //  }, (err) => {

    // });  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsDetailPage');
  }

}
