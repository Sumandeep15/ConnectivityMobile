import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, Toast } from 'ionic-angular';

import { LoginPage, HomePage, ConnectionsPage, SchedulePage, ServicesPage, NewsPage, EventsPage, GalleryPage, NotificationsPage, VideogalleryPage } from '../pages/pages';
import { Settings } from '../providers';

import { GlobalVars } from '../providers/providers';
import { AlertController } from 'ionic-angular';
import { StorageService } from '../providers/storage/storageservice';

import { ToastController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';
import { Network } from '@ionic-native/network';
import { SMS } from '@ionic-native/sms';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { GalleryListPage, VideogalleryListPage } from '../pages/pages';
import { Events } from 'ionic-angular';
@Component({
  templateUrl: 'app.html',

})
export class MyApp {
  rootPage = null;
  appHeading = "Connectivity"
  @ViewChild(Nav) nav: Nav;

  pages: any[] = [

    { title: 'Home', component: HomePage },
    { title: 'My Connections', component: ConnectionsPage },
    { title: 'Notifications', component: NotificationsPage },
    { title: 'Logout', component: "LogoutPage" }
  ]
  pages1: any[] = [

    { title: 'Home', component: HomePage },
    { title: 'Notifications', component: NotificationsPage },
    { title: 'Events', component: EventsPage },
    { title: 'Activity', component: SchedulePage },
    { title: 'Services', component: ServicesPage },
    { title: 'News', component: NewsPage },
    { title: 'Photo Gallery', component: GalleryListPage },
    { title: 'Video Gallery', component: VideogalleryListPage },
    { title: 'Logout', component: "LogoutPage" }
  ]
  constructor(private sms: SMS,
    private androidPermissions: AndroidPermissions,
    private network: Network,
    toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    platform: Platform,
    public GlobalVars: GlobalVars,
    settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storage: StorageService,
    public events: Events) {
    // alert("ss")
    events.subscribe('company:name', (variable) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      this.appHeading = variable
    });
    // alert(this.GlobalVars.myGlobalVar);

    platform.ready().then(() => {

      //  var myVar = setInterval(alertFunc, 6000);

      // platform.registerBackButtonAction(() => {

      //   if (this.storage.get("guser") != null) {
      //     this.rootPage = HomePage;
      //   }
      //   else {
      //     this.rootPage = "WelcomePage"
      //   }
      // });




      if (this.storage.get("guser") != null) {
        this.rootPage = HomePage;
      }
      else {
        this.rootPage = "WelcomePage"
      }
      // Schedule multiple notifications

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.androidPermissions.requestPermissions(
        [this.androidPermissions.PERMISSION.SEND_SMS,
        this.androidPermissions.PERMISSION.READ_PHONE_STATE]);

    });

    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      let alert1 = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Internet not found.',
        buttons: ['OK']
      });
      alert1.present();
    });

    // stop disconnect watch
    // disconnectSubscription.unsubscribe();


    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {
      // console.log('network connected!');
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });
    this.initTranslate();

    // let disconnectSub = Network.onDisconnect().subscribe(() => {
    //   let toast = toastCtrl.create({
    //     message: "Internet not working",
    //     duration: 3000,
    //     position: 'top'
    //   });
    //   toast.present();
    // });

    // let connectSub = Network.onConnect().subscribe(() => {
    //   // alert("Good");
    // });

  }


  myHandlerFunction() {
    //  alert("ssss")
    this.rootPage = HomePage;
  }
  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  homebtn() {
    this.nav.setRoot(HomePage);
    console.log("homebtn");
  }
}
