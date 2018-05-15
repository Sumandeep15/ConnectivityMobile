import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';
import { Items } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-organization-detail',
  templateUrl: 'organization-detail.html'
})
export class OrganizationDetailPage {
 // item: any;
  currentItem: any;
  AppUserModel: { OrganizationId: any } = {

    OrganizationId: 0
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.AppUserModel = this.navParams.get('record');
   // alert(JSON.stringify(this.AppUserModel))
    // this.Events.GetCompanyActivity(this.AppUserModel).subscribe((resp: any) => {
    this.currentItem = this.AppUserModel;
    console.log(this.currentItem);
    //  }, (err) => {

    // });
  }
 ionViewDidLoad() {
    $(".menu2hide").show();
     $(".menu1hide").hide();
    // console.log('ionViewDidLoad ConnectionsPage');
  }
}
