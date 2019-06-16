import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { ApiResponse } from 'src/app/models/api-response';
import { CarServerService } from 'src/app/services/backend-services/car-server.service';
import { RequestStatus } from 'src/app/models/enum.enum';
import { ApplicationSettings } from 'src/app/services/application-settings.service';
import { ToastController } from '@ionic/angular';
import { DatabaseHelper } from 'src/app/services/database-helper.service';
import { CarData } from 'src/app/models/car-data';
import * as _ from 'lodash';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  carsData: Array<CarData>;
  offSetValues: any = 10;
  infinteEvent: any;
  totalCarDataCount: any;
  dataLoaded = false;
  constructor(
    public carService: CarService
  ) {

  }

  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.getCarData();
    this.getTotalCarCount();
  }

  async getCarData() {
    const optionResp: any = await this.carService.getCarDataOffset(this.offSetValues);
    if (this.offSetValues === 0) {
      this.carsData = optionResp;
    } else {
      this.carsData = _.union(this.carsData, optionResp);
    }
    this.dataLoaded = true;
    this.offSetValues = this.offSetValues + 10;
    console.log(this.carsData);
  }

  async getTotalCarCount() {
    this.totalCarDataCount = await this.carService.getDataCount();
    console.log(this.totalCarDataCount);
  }

  async loadData(event) {
    console.log("event", event);
    this.infinteEvent = event;
    if (this.offSetValues < this.totalCarDataCount) {
      await this.getCarData();
      this.infinteEvent.target.complete();
    } else {
      this.infinteEvent.target.complete();
      this.infinteEvent.disabled = true;
    }
  }

}
