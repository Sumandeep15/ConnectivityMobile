import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, ToastController } from 'ionic-angular';
import { Items } from '../../providers/providers';
import { MenuController } from 'ionic-angular';
import { Api, Organizations, StorageService, User, GlobalVars } from '../../providers/providers';
import { Events } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-organization-detail',
  templateUrl: 'organization-detail.html'
})
export class OrganizationDetailPage {
  // item: any;
  currentItem: any;
  apiURL: any;
  Item: any;
  AppUserMode: { OrganizationId: any } = {

    OrganizationId: 0
  };
  AppUserModel: {
    aboutUs: any,
    contactUs: any
  } = {

      aboutUs: "",
      contactUs: ""
    };
  globalVar: any;
  constructor(public events: Events,
    public navCtrl: NavController,
    public api: Api,
    public GlobalVars: GlobalVars,
    public navParams: NavParams,
    public menu: MenuController,
    public Organizations: Organizations,
    private loadingCtrl: LoadingController,
    public platform: Platform,
    private toastCtrl: ToastController) {
    this.currentItem = this.GlobalVars.getMyGlobalVar();
    this.events.publish('company:name', this.currentItem.name);
    this.apiURL = api.url;
    this.globalVar = this.GlobalVars.CompanyView;
    this.Item = this.navParams.data;
    // alert(JSON.stringify(this.AppUserModel))
    // this.Events.GetCompanyActivity(this.AppUserModel).subscribe((resp: any) => {
    //   alert(this.GlobalVars.CompanyView );
    console.log(JSON.stringify(this.navParams.data));
    if (this.GlobalVars.CompanyView == true) {
      this.menu.enable(false, 'menu1');
      this.menu.enable(true, 'menu2');
    }
    else {
      this.menu.enable(true, 'menu1');
      this.menu.enable(false, 'menu2');
    }

    this.Organizations.Organizationdetail(this.currentItem.id).subscribe((resp: any) => {
      this.AppUserModel = resp.data;

    }, (err) => {

    });

  }
  addItem() {
    let loadingPopup = this.loadingCtrl.create({
      content: 'Processing...'
    });
    loadingPopup.present();//Loader

    // this.AppUserMode.OrganizationId = this.navParams.data;
    this.AppUserMode.OrganizationId = this.Item.id; 
      this.Organizations.linkOrganization(this.AppUserMode).subscribe((resp) => {
        if (resp) {
          setTimeout(() => {
            loadingPopup.dismiss();
          }, 500);
          let toast = this.toastCtrl.create({
            message: 'Joined Successfully.',
            duration: 3000,
            position: 'top'
          });
          toast.present();
          this.globalVar = this.GlobalVars.CompanyView;
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
    this.menu.enable(false, 'menu1');
    this.menu.enable(true, 'menu2');
  }

  ionViewDidLoad() {

    // console.log('ionViewDidLoad ConnectionsPage');
  }
}
