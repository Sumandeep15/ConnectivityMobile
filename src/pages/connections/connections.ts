import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';

import { Connections, User } from '../../providers/providers';
import { Device } from '@ionic-native/device';
import { EventsPage, SchedulePage } from '../pages';
import * as $ from 'jquery'

/**
/**
 * Generated class for the ConnectionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connections',
  templateUrl: 'connections.html',
})
export class ConnectionsPage {
  currentItems: any;
  AppUserModel: { OrganizationId: any } = {

    OrganizationId: 0
  };
  constructor(public currentItemsnavCtrl: NavController, public navParams: NavParams,
    public Connections: Connections,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public user: User,
    private device: Device) {
    this.Connections.GetConnections().subscribe((resp: any) => {
      if (!user.authenticated) {
        this.navCtrl.push("LoginPage");
      }
      else {
       // alert("hnji")
        //$("#settingsTable").append();
        this.currentItems = resp.data;
      }
      //alert(  JSON.stringify( this.currentItems));
    }, (err) => {

    });
  }

  ionViewDidLoad() {
    $(".menu1hide").show();
     $(".menu2hide").hide();
    // console.log('ionViewDidLoad ConnectionsPage');
  }

  viewEvents(id) {
    this.navCtrl.push(EventsPage, { 'id': id })
  }
  viewSchedule(id) {
    this.navCtrl.push(SchedulePage, { 'id': id })
  }


  removeItem(item) {

    this.AppUserModel.OrganizationId = item.id;
    //alert(this.device.uuid);
    // this.account.UUID = this.device.uuid;
    // Attempt to login in through our User service
    this.Connections.unlinkOrganization(this.AppUserModel).subscribe((resp) => {
      if (resp) {
        this.currentItems.splice(item);
        let toast = this.toastCtrl.create({
          message: "Remove successfully",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    }, (err) => {

      this.navCtrl.push("LoginPage");

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: "error",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

}
