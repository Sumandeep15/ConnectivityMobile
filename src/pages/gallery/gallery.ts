import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams, Platform } from 'ionic-angular';
import { Api, Gallery, User, GlobalVars } from '../../providers/providers';
import { PhotoViewer } from '@ionic-native/photo-viewer';



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
    public api: Api,
    public photoViewer: PhotoViewer, 
    private platform:Platform) {

    this.currentItems = this.navParams.data;
    console.log("One Gallery");
    console.log(JSON.stringify(this.currentItems));
    this.apiUrl = api.url;

  
  }

  openImg(apiurl, imgurl, imgname) {
    this.photoViewer.show(apiurl + imgurl + "/" + imgname, imgname, { share: false });
    console.log(apiurl + imgurl + "/" + imgname);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrganizationsPage');
  }
  viewDetail(item) {
    this.navCtrl.push("EventsDetailPage", { 'record': item })
  }


}
