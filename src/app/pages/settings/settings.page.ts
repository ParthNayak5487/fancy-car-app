import { Component, OnInit } from '@angular/core';
import { SelectTheme } from 'ionic-angular-theme-switch';
import { defaultTheme, darkTheme } from 'src/app/models/themes';
import { TranslateService } from '@ngx-translate/core';
import { LoadingController, Platform } from '@ionic/angular';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { I18nSwitcherService } from 'src/app/services/i18n-switcher.service';
import { ApplicationSettings } from 'src/app/services/application-settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  hideMenu: boolean;
  valueChangedlbl = false;
  translation: any;
  appVersion: any;
  showOpChangeBtn: boolean;
  pageTitle: any;
  settings: any = { lang: '' };
  saveLoading: any;
  public themes: SelectTheme[] = [
    {
      key: 'default',
      label: 'Default',
      theme: defaultTheme
    },
    {
      key: 'dark',
      label: 'Dark',
      theme: darkTheme
    }
  ];
  constructor(
    public translateService: TranslateService,
    public loadingCtrl: LoadingController,
    private platform: Platform,
    public settingServ: SettingsService,
    private i18nSwitcherProvider: I18nSwitcherService,
  ) {



    // this.customPopoverOptions = {
    //   header: 'Hair Color',
    //   subHeader: 'Select your hair color',
    //   message: 'Only select your dominant hair color'
    // };
    translateService.get(['SAVING_MSG_LOADER']).subscribe(value => {
      console.log(value);
      this.translation = value;
    });
    this.appVersion = ApplicationSettings.appVersion;
  }

  async ngOnInit() {
    this.valueChangedlbl = false;
    const temp = await this.settingServ.getSettings();
    console.log('temp', temp);
    this.settings.lang = temp ? temp.language : '';
    this.valueChangedlbl = true;
    if (this.platform.is('android')) {
      this.hideMenu = true;
    } else {
      this.hideMenu = false;
      // this.menuCtrl.swipeEnable(false);
    }
  }

  async ionViewDidEnter() {

  }

  async valueChanged() {
    if (this.valueChangedlbl) {
      // this.saveLoading.present();
      console.log(this.settings);
      await this.settingServ.deleteSettings();
      await this.settingServ.insertSettings(this.settings).then(data => {
        console.log('Save settings response', data);
        ApplicationSettings.deviceLang = this.settings.lang;
        this.i18nSwitcherProvider.switchLang(ApplicationSettings.deviceLang);
        // console.log(ApplicationHelper.deviceLang);
        // console.log(ApplicationHelper.saveToGallery);
        // this.saveLoading.dismiss();
      }).catch(e => {
        console.error(e);
        // this.saveLoading.dismiss();
      });
    } else {

    }
  }
}
