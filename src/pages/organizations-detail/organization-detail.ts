import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  AppUserModel: {
    aboutUs: any,
    contactUs: any
  } = {

    aboutUs: "-",
    contactUs: "-"
  };
  constructor(public events: Events, public navCtrl: NavController, public api: Api, public GlobalVars: GlobalVars, public navParams: NavParams, public menu: MenuController, public Organizations: Organizations) {
    this.currentItem = this.GlobalVars.getMyGlobalVar();
    this.events.publish('company:name', this.currentItem.name);
    this.apiURL = api.url;
    // alert(JSON.stringify(this.AppUserModel))
    // this.Events.GetCompanyActivity(this.AppUserModel).subscribe((resp: any) => {
   //   alert(this.GlobalVars.CompanyView );
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
  ionViewDidLoad() {

    // console.log('ionViewDidLoad ConnectionsPage');
  }
}
