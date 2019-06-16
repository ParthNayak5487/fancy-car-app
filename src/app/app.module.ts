import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Http } from '@angular/http';
import { Device } from '@ionic-native/device/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Api } from './services/api.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { DatabaseHelper } from './services/database-helper.service';
import { HttpInterceptorService } from './services/http.interceptor.service';
import { Network } from '@ionic-native/network/ngx';
import { I18nSwitcherService } from './services/i18n-switcher.service';
import { NetworkService } from './services/network.service';
import { SettingsService } from './services/settings/settings.service';
import { Globalization } from '@ionic-native/globalization/ngx';
import { PipeModule } from './pipes/pipemodule';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicAngularThemeSwitchSelectModule, IonicAngularThemeSwitchService } from 'ionic-angular-theme-switch';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    PipeModule,
    HttpClientModule,
    TranslateModule.forChild(),
    IonicStorageModule.forRoot(),
    IonicAngularThemeSwitchSelectModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Api,
    DatabaseHelper,
    IonicAngularThemeSwitchService,
    SQLite,
    HttpInterceptorService,
    Network,
    I18nSwitcherService,
    NetworkService,
    SettingsService,
    Device,
    Globalization,
    Http,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
