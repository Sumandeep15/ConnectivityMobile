import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams, Platform } from 'ionic-angular';

import { Api, Connections, User, GlobalVars } from '../../providers/providers';
import { Device } from '@ionic-native/device';
import { EventsPage, SchedulePage } from '../pages';
import { MenuController, LoadingController, AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
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
  apiURL: any;
  AppUserModel: { OrganizationId: any } = {

    OrganizationId: 0
  };
  data:boolean = false;
  constructor(public currentItemsnavCtrl: NavController, public navParams: NavParams,
    public Connections: Connections,
    public api: Api,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public platform: Platform,
    public user: User,
    private device: Device,
    public menu: MenuController, private loadingCtrl: LoadingController,
    public GlobalVars: GlobalVars,
    private alertCtrl: AlertController,
    public events: Events) {
    this.events.publish('company:name', "Connectivity");
    this.apiURL = api.url
    let loadingPopup = this.loadingCtrl.create({
      content: 'Processing...'
    });
    loadingPopup.present();//Loader
    this.GlobalVars.CompanyView = true;
    this.menu.enable(true, 'menu1');
    this.menu.enable(false, 'menu2');
    this.Connections.GetConnections().subscribe((resp: any) => {
      setTimeout(() => {
        loadingPopup.dismiss();
      }, 500);
      if (!user.authenticated) {
        this.navCtrl.push("LoginPage");
      }
      else {
        this.currentItems = resp.data;
        console.log(JSON.stringify(this.currentItems));
        
        if (this.currentItems == null || this.currentItems.length < 1)
        {
          this.data = true;
          // this.currentItems = null;
        }
      }
      
    }, (err) => {

    });
  }
  delete(item: any) {
    this.currentItems.splice(this.currentItems.indexOf(item), 1);
  }
  

  viewEvents(id) {
    this.navCtrl.push(EventsPage, { 'id': id })
  }
  viewSchedule(id) {
    this.navCtrl.push(SchedulePage, { 'id': id })
  }


  removeItem(item) {

    this.AppUserModel.OrganizationId = item.id;
    this.alertCtrl.create({
      title: 'Are You Sure',
      subTitle: 'Remove <stong>'+ item.name +"<strong>.",
      buttons: [{
        text: 'Yes',
        handler: () => 
        {
          let loadingPopup = this.loadingCtrl.create({
            content: 'Processing...'
          });
          loadingPopup.present();//Loader
          
          this.Connections.unlinkOrganization(this.AppUserModel).subscribe((resp) => {
            if (resp) {
              setTimeout(() => {
                loadingPopup.dismiss();
              }, 500);
              this.currentItems.splice(this.currentItems.indexOf(item), 1);

              let toast = this.toastCtrl.create({
                message: 'Removed Successfully.',
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
      },
      {
        text: 'No',
        role: 'cancel',
      }]
    }).present();
    //alert(this.device.uuid);
    // this.account.UUID = this.device.uuid;
    // Attempt to login in through our User service


  }
  viewCompany(item) {
    this.GlobalVars.setMyGlobalVar(item);
    this.navCtrl.setRoot("OrganizationDetailPage", { 'record': item })
  }
  ionViewDidLoad() {

  }
  ionViewDidEnter() {
    this.GlobalVars.currentpage = "ConnectionsPage";
    
  }
  ionViewWillLeave() {
    this.GlobalVars.currentpage = null;
    
  }
}
