import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';
import { User } from '../../providers/providers';
import { Device } from '@ionic-native/device';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@IonicPage()
@Component({
  selector: 'logout-login',
  templateUrl: 'logout.html'

})
export class LogoutPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type


  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public device: Device,
    private sms: SMS,
    public menu: MenuController,
    private loadingCtrl: LoadingController,
    private androidPermissions: AndroidPermissions,
    private alertctrl: AlertController) {
    this.user.logout();


    this.navCtrl.setRoot("WelcomePage");
  }
}