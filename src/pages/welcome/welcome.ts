import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { GlobalVars } from '../../providers/providers';
/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  alertexit:any;
  constructor(public navCtrl: NavController,
    public menu: MenuController,
    private platform: Platform,
    private alertCtrl:AlertController,
    private GlobalVars:GlobalVars) {

    this.menu.enable(false, 'menu1');
    this.menu.enable(false, 'menu2');

    this.platform.registerBackButtonAction(() => {
      if (this.navCtrl.canGoBack()) // if on any third page
      {
        this.navCtrl.pop();
      }
      else 
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
                role: 'cancel',
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
    }, 0);
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
  ionViewDidEnter() {
    // this.GlobalVars.previousView.push("OrganizationsPage");
    this.GlobalVars.currentpage = "WelcomePage";

  }
}
