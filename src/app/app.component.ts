import { Component } from '@angular/core';
import { Globalization } from '@ionic-native/globalization/ngx';
import { Platform, Config } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';
import { I18nSwitcherService } from './services/i18n-switcher.service';
import { SettingsService } from './services/settings/settings.service';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationSettings } from './services/application-settings.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private i18nSubscription: Subscription;
  public appPages: any;
  activePage: any;
  translation: any = [];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private i18nSwitcherProvider: I18nSwitcherService,
    public settingServ: SettingsService,
    private globalization: Globalization,
    private translate: TranslateService,
    private config: Config,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initTranslate();

      this.i18nSubscription = this.i18nSwitcherProvider.watch().subscribe((lang: string) => {
        this.translate.use(lang);
        this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
          if (this.platform.is('ios')) {
            this.config.set('backButtonText', values.BACK_BUTTON_TEXT);
          }
        });
      });
    });
  }

  async initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    const settings = await this.settingServ.getSettings();
    console.log('Settings', settings);
    if (settings) {
      ApplicationSettings.deviceLang = settings.language === '' ? await this.getLang() : settings.language;
      this.translate.use(ApplicationSettings.deviceLang);
    } else {
      try {
        ApplicationSettings.deviceLang = await this.getLang();
        this.translate.use(ApplicationSettings.deviceLang);
      } catch (e) {
        console.log(e);
      }
    }
    console.log('Device lang', ApplicationSettings.deviceLang);

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      if (this.platform.is('ios')) {
        this.config.set('backButtonText', values.BACK_BUTTON_TEXT);
      }
    });
  }

  async getLang() {
    const tempLang = await this.globalization.getPreferredLanguage();
    if (tempLang.value === 'pt-BR') {
      return 'pt-br';
    } else {
      return 'en';
    }
  }

}
