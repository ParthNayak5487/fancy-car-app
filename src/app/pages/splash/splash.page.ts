import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { ApplicationSettings } from 'src/app/services/application-settings.service';
import { DeviceData } from 'src/app/models/device';
import { Device } from '@ionic-native/device/ngx';
import { CarService } from 'src/app/services/car.service';
import * as _ from 'lodash';
import { ApiResponse } from 'src/app/models/api-response';
import { RequestStatus } from 'src/app/models/enum.enum';
import { CarServerService } from 'src/app/services/backend-services/car-server.service';
import { DatabaseHelper } from 'src/app/services/database-helper.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  translation: any;
  loading: any;
  constructor(
    public navCtrl: NavController,
    public network: Network,
    private device: Device,
    public carService: CarService,
    public carServer: CarServerService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public alertCltrl: AlertController,
    public databaseHelper: DatabaseHelper,
    public translateService: TranslateService,
  ) {
    ApplicationSettings.deviceData = new DeviceData(this.device);
  }

  checkNetwork() {
    ApplicationSettings.isApplicationOnline = navigator.onLine;
    if (ApplicationSettings.isApplicationOnline) {
      this.getServerData();
    } else {
      this.checkHaveData();
    }
  }

  homePage() {
    this.navCtrl.navigateRoot('/home-tabs-page/hometabs/home');
  }

  async getServerData() {
    const carServerResponse: ApiResponse = await this.carServer.getAllCarData();
    if (carServerResponse.status === RequestStatus.Success) {
      await this.carService.deleteCarDatabase();
      this.carService.insertAllCarData(carServerResponse.data);

      setTimeout(() => {
        ApplicationSettings.showToast(
          this.toastCtrl,
          this.translation.SUCCESS_SENDING,
          'success',
          'top'
        );
        this.homePage();
      }, 7000);
    } else if (carServerResponse.status === RequestStatus.Fail) {
      if (carServerResponse.message === 'No internet') {
        //  No internet test
      } else {
        const errorReason = carServerResponse.errorMessage ? carServerResponse.errorMessage + ' ' : ' ';
        const errorReason1 = carServerResponse.statusCode + ' ';
        const errorReason2 = carServerResponse.statusText;
        ApplicationSettings.showErrorToast(
          this.toastCtrl,
          this.translation.FAILED_GETTING_SERVER_DATA + ' ' + errorReason + errorReason1 + errorReason2,
          'danger',
          'top',
          10000
        );
      }
    }
  }

  nowifi() {
    this.navCtrl.navigateRoot('/no-wifi');
  }

  async checkHaveData() {
    const carData = await this.carService.getData();
    if (_.size(carData) > 0) {
      //   Data was fetch recently from server and have data to display take user to home page
      this.homePage();
    } else {
      // Due to not a single time data has been fetch from server we have to show no data and no wifi page. 
      this.nowifi();
    }
  }

  ngOnInit() {
    const that = this;
    this.translateService.get([
      'FAILED_GETTING_SERVER_DATA',
      'FAILED_SENDING',
      'PLEASE_WAIT'
    ]).subscribe((value) => {
      this.translation = value;
    });
    setTimeout(() => {
      that.checkNetwork();
    }, 3000);
  }

}
