import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, Toast, Platform } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage, LandingPage, HomePage, MenuPage } from '../pages';
import { Device } from '@ionic-native/device';
import { FCM } from '@ionic-native/fcm';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  menu1hide: true;
  menu2hide: false;
  modulename: "Login"
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { userName: string, password: string, uuid: string, token: string } = {
    userName: '',
    password: '',
    uuid: '',
    token: ''
  };
  userpattern = /^\d{8,13}$/;
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public menu: MenuController,
    private device: Device,
    private platform: Platform,
    public fcm: FCM) {

    this.menu.enable(false, 'menu1');
    this.menu.enable(false, 'menu2');
    if (this.platform.is('cordova')) {
      fcm.subscribeToTopic('all');
      fcm.getToken().then(token => {
        this.account.token = token;
      })

      fcm.onNotification().subscribe(data => {
        //  alert("Data: " + data);
        if (data.wasTapped) {
          alert("Received in background");
        } else {
          alert("Received in foreground");
        };
      })
      fcm.onTokenRefresh().subscribe(token => {
       this.account.token = token;
      });
    }
  }

  // Attempt to login in through our User service
  doLogin() {
 this.account.token = "ss";
    if (this.account.userName == "" || this.account.password == "") {
      this.toastCtrl.create({
        message: "Please enter all details",
        duration: 3000,
        position: 'center'
      }).present();
    }
    else {
      this.account.uuid = this.device.uuid;
      this.user.login(this.account).subscribe((resp: any) => {
        // alert(JSON.stringify(resp))
        if (resp.status == 1) {
          // alert("here")
          this.navCtrl.setRoot(HomePage);
        }
        else if (resp.status == -1) {
          this.toastCtrl.create({
            message: "Invalid PhoneNumber/Password",
            duration: 3000,
            position: 'center'
          }).present();

        }
        else { }
      }, (err) => {
        // alert(JSON.stringify(err))
        // this.navCtrl.push(HomePage);
        // Unable to log in

      });
    }

  }
}
