import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { CarServerService } from 'src/app/services/backend-services/car-server.service';
import * as moment from 'moment';
import { ApplicationSettings } from 'src/app/services/application-settings.service';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { RequestStatus } from 'src/app/models/enum.enum';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.page.html',
  styleUrls: ['./car-detail.page.scss'],
})
export class CarDetailPage implements OnInit {
  carId: any;
  carDetail: any;
  translation: any;
  dataLoaded = false;
  loading: any;
  constructor(
    private route: ActivatedRoute,
    public carService: CarService,
    public carServerService: CarServerService,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public navCtrl: NavController,
    public location: Location,
    private sSharing: SocialSharing,
    public loadingCtrl: LoadingController
  ) {
    this.carId = this.route.snapshot.paramMap.get('carId');
    this.getCarDetail();
  }

  async getCarDetail() {

    this.carDetail = await this.carService.getCarDetail(this.carId);

    if (ApplicationSettings.isApplicationOnline) {

      this.presentLoading(this.translation.PLEASE_WAIT_MSG, true);

      const carAvaiablityResponse = await this.carServerService.getCarAvailable(this.carId);

      this.presentLoading(null, false);

      if (carAvaiablityResponse.status === RequestStatus.Success) {

        this.carDetail.available = carAvaiablityResponse.data.available;
        await this.carService.updateDetailById(this.carId, this.carDetail.available);

      }
    }
    this.dataLoaded = true;
  }

  async onBuyClick() {
    await this.carService.insertCarOrder(this.carDetail, moment().format('YYYY-MM-DD HH:mm:ss'));
    ApplicationSettings.showToast(this.toastCtrl, this.translation.ORDER_PLACED_MSG, 'success', 'top');
    this.location.back();
  }

  ngOnInit() {
    this.translateService.get([
      'ORDER_PLACED_MSG',
      'PLEASE_WAIT_MSG'
    ]).subscribe((value) => {
      this.translation = value;
    });
  }

  async socialSharing() {
    this.sSharing.share(this.carDetail.name, null, null, null);
  }

  async presentLoading(loadingText: string, show: boolean) {
    if (show) {
      this.loading = await this.loadingCtrl.create({
        spinner: 'lines-small',
        message: loadingText,
        cssClass: 'loading'
      });
      await this.loading.present();
    } else {
      this.loading.dismiss();
    }

  }


}
