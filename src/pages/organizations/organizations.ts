import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';
import { Organizations, StorageService,User } from '../../providers/providers';
import { Device } from '@ionic-native/device';
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

  currentItems: any;
  AppUserModel: { OrganizationId: any } = {

    OrganizationId: 0
  };
  constructor(public currentItemsnavCtrl: NavController, public navParams: NavParams,
    public Organizations: Organizations,
    public StorageService: StorageService,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
public user :User,
    private device: Device) {
    this.Organizations.list().subscribe((resp: any) => {
      if (!user.authenticated) {
        this.navCtrl.push("LoginPage");
      }
      else {
        this.currentItems = resp.data;
      }
      // alert(  JSON.stringify( this.currentItems));
    }, (err) => {

    });
  }


 ionViewDidLoad() {
    $(".menu1hide").show();
     $(".menu2hide").hide();
    // console.log('ionViewDidLoad ConnectionsPage');
  }

  addItem(item) {

    this.AppUserModel.OrganizationId = item.id;
    //alert(this.device.uuid);
    // this.account.UUID = this.device.uuid;
    // Attempt to login in through our User service
    this.Organizations.linkOrganization(this.AppUserModel).subscribe((resp) => {
      if (resp) {
        // this.currentItems.splice(item);
        // let toast = this.toastCtrl.create({
        //   message: "Add successfully",
        //   duration: 3000,
        //   position: 'top'
        // });
        // toast.present();
        //  this.currentItems.splice(item);
        //   document.getElementById("#click" + item.id).hide()
        //      $("#click1").html('')
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
    this.navCtrl.push("OrganizationDetailPage", { 'record': item })
  }
  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: any) {
    this.currentItemsnavCtrl.push('OrganizationDetailPage', {
      item: item
    });
  }

}
