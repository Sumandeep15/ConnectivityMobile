import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { LoginPage,HomePage,ConnectionsPage,SchedulePage,ServicesPage,NewsPage,EventsPage ,GalleryPage} from '../pages/pages';
import { Settings } from '../providers';

@Component({
  templateUrl: 'app.html',

})
export class MyApp {
  rootPage = "WelcomePage";

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
  //  { title: 'Tutorial', component: 'TutorialPage' },
  //  { title: 'Welcome', component: 'WelcomePage' },
 //   { title: 'Tabs', component: 'TabsPage' },
 //   { title: 'Cards', component: 'CardsPage' },
  //  { title: 'Content', component: 'ContentPage' },
 //   { title: 'Login', component: 'LoginPage' },
 //   { title: 'Signup', component: 'SignupPage' },
 //   { title: 'Master Detail', component: 'ListMasterPage' },
 //   { title: 'Menu', component: 'MenuPage' },
    { title: 'Home', component:HomePage },
    { title: 'My Connections', component: ConnectionsPage },
    { title: 'Logout', component: "WelcomePage" }
  ]
pages1: any[] = [
  //  { title: 'Tutorial', component: 'TutorialPage' },
  //  { title: 'Welcome', component: 'WelcomePage' },
 //   { title: 'Tabs', component: 'TabsPage' },
 //   { title: 'Cards', component: 'CardsPage' },
  //  { title: 'Content', component: 'ContentPage' },
 //   { title: 'Login', component: 'LoginPage' },
 //   { title: 'Signup', component: 'SignupPage' },
 //   { title: 'Master Detail', component: 'ListMasterPage' },
 //   { title: 'Menu', component: 'MenuPage' },

     { title: 'Home', component:HomePage },
    { title: 'News', component:NewsPage },
    { title: 'Events', component: EventsPage },
    { title: 'Schedule', component: SchedulePage },
    { title: 'Services', component: ServicesPage },
    { title: 'Gallery', component: GalleryPage },

  ]
  constructor(private translate: TranslateService, platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();
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
}
