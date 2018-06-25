import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams, Platform } from 'ionic-angular';
import { Api, Organizations, StorageService, User, GlobalVars } from '../../providers/providers';
import { Device } from '@ionic-native/device';
import { MenuController, LoadingController, AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
/**
 * Generated class for the OrganizationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-organizations',
  templateUrl: 'organizations.html',

})
export class OrganizationsPage {
  alertexit: any
  currentItems: any;
  fullItems: any;
  apiURL: any;
  AppUserModel: { OrganizationId: any } = {

    OrganizationId: 0
  };
  constructor(public currentItemsnavCtrl: NavController,
    public navParams: NavParams,
    public Organizations: Organizations,
    public StorageService: StorageService,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public api: Api,
    public translateService: TranslateService,
    public user: User,
    public GlobalVars: GlobalVars,
    private device: Device,
    public menu: MenuController, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public events: Events,
    private platform: Platform) {
    this.events.publish('company:name', "Connectivity");
    this.apiURL = api.url;
    let loadingPopup = this.loadingCtrl.create({
      content: 'Processing...'
    });
    loadingPopup.present();//Loader
    this.menu.enable(true, 'menu1');
    this.menu.enable(false, 'menu2');



    this.Organizations.list().subscribe((resp: any) => {
      setTimeout(() => {
        loadingPopup.dismiss();
      }, 500);

      if (!user.authenticated) {
        this.navCtrl.push("LoginPage");
      }
      else {
        this.fullItems = this.currentItems = resp.data;
      }
      // alert(  JSON.stringify( this.currentItems));
    }, (err) => {

    });

    ////////////////////////////////////////////////////////////////////////////////////////////
    this.platform.registerBackButtonAction(() => {
      if (this.navCtrl.canGoBack()) // if on any third page
      {
        this.navCtrl.pop();
      }
      else if (this.GlobalVars.currentpage == "NotificationsPage")//Go to last opened page
      {
        let last = this.GlobalVars.previousView.pop();
        if (last == null || last ==  "")
        {
          this.navCtrl.setRoot("OrganizationsPage");
        }
        else
        {
          this.navCtrl.setRoot(last);
        }
      }
      else if (this.GlobalVars.currentpage == "ConnectionsPage")// Go to home page
      {
        this.navCtrl.setRoot("OrganizationsPage");
      }
      else if (this.GlobalVars.currentpage == "OrganizationsPage" || this.GlobalVars.currentpage == "WelcomePage" ) //ask for exit
      {
        if (this.alertexit == undefined) {
          this.alertexit = this.alertCtrl.create({
            title: 'Exit Application',
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.platform.exitApp()
                }
              },
              {
                text: 'Cancel',
                
                handler: () => {
                  this.alertexit = undefined;
                }
              }
            ]
          }).present();
        }
        else {
          this.alertexit.present();
        }
      }
      else if (this.GlobalVars.CompanyView == false) //if unjoined company => Home
      {
        this.navCtrl.setRoot("OrganizationsPage");
      }
      else if (this.GlobalVars.CompanyView == true) // if joined company => Connection
      {
        this.navCtrl.setRoot("ConnectionsPage");
      }// don't change before this
      
    }, 1);
  }
  initializeItems(ev: any) {
    this.currentItems = this.fullItems;
  }
  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems(ev);

    // set val to the value of the searchbar
    let val = ev.target.value;
    //alert(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '' && this.currentItems != null) {
      this.currentItems = this.currentItems.filter((item) => {
        //alert(JSON.stringify(item))
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
          // || (item.strCity != null && item.strCity.toLowerCase().indexOf(val.toLowerCase())) > -1
          // || (item.strState != null && item.strState.toLowerCase().indexOf(val.toLowerCase())) > -1
          // || (item.strCountry != null && item.strCountry.toLowerCase().indexOf(val.toLowerCase())) > -1);
      })
    }
  }

  delete(item: any) {
    this.currentItems.splice(this.currentItems.indexOf(item), 1);
  }
  addItem(item) {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Processing...'
    });
    loadingPopup.present();//Loader

    this.AppUserModel.OrganizationId = item.id;

    this.Organizations.linkOrganization(this.AppUserModel).subscribe((resp) => {
      if (resp) {
        setTimeout(() => {
          loadingPopup.dismiss();
        }, 500);
        this.currentItems.splice(this.currentItems.indexOf(item), 1);
        let toast = this.toastCtrl.create({
          message: 'Joined Successfully.',
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

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.currentItems.delete(item);

  }
  viewCompany(item) {
    this.GlobalVars.setMyGlobalVar(item);
    this.GlobalVars.CompanyView = false;
    this.navCtrl.setRoot("OrganizationDetailPage", item)
    console.log(JSON.stringify(item));
    console.log(item);

  }
  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: any) {
    this.currentItemsnavCtrl.push('OrganizationDetailPage', {
      item: item
    });
  }
  ionViewDidLoad() {

    // console.log('ionViewDidLoad ConnectionsPage');
  }
  ionViewDidEnter() {
    // this.GlobalVars.previousView.push("OrganizationsPage");
    this.GlobalVars.currentpage = "OrganizationsPage";

  }
  ionViewWillLeave() {
    this.GlobalVars.currentpage = null;
  }
}
