import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseHelper } from 'src/app/services/database-helper.service';
import { TranslateService } from '@ngx-translate/core';
import { CarService } from 'src/app/services/car.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-filter-option',
  templateUrl: './filter-option.page.html',
  styleUrls: ['./filter-option.page.scss'],
})
export class FilterOptionPage implements OnInit {

  filterValues: any;
  hideEdit: boolean;
  headerColor: any;
  translation: any;
  brandValues: any;
  availValues: any;
  brandNameAlertOption: any;
  availAlertOption: any;
  dataLoaded = false;
  constructor(
    private router: Router,
    public databaseHelper: DatabaseHelper,
    public alertController: AlertController,
    public carService: CarService,
    public translateService: TranslateService,
    public location: Location
  ) {

    this.filterValues = this.carService.getFilterData();

    if (!this.filterValues) {

      this.filterValues = {
        brandName: null,
        available: null
      };
    }

    this.dataLoaded = true;
  }

  ngOnInit() {
    this.translateService.get([
      'BRAND_NAME_LBL',
      'AVAIL_LBL'
    ]).subscribe((value) => {
      this.translation = value;
    });
    this.initializeAlertOption();
    this.getValues();
  }

  initializeAlertOption(): any {
    this.brandNameAlertOption = {
      header: this.translation.BRAND_NAME_LBL,
      translucent: false
    };
    this.availAlertOption = {
      header: this.translation.AVAIL_LBL,
      translucent: false
    };

  }


  async onFilter() {
    if (this.filterValues.brandName === '' && this.filterValues.available === '') {
      this.filterValues = undefined;
    }
    this.carService.updateFilterData(this.filterValues);
    this.location.back();
  }

  async getValues() {
    this.brandValues = await this.databaseHelper.getDistinctNames();
  }


  onClose() {
    this.location.back();
  }

}
