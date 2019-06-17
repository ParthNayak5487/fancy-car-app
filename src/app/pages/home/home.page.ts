import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CarService } from 'src/app/services/car.service';
import { CarData } from 'src/app/models/car-data';
import * as _ from 'lodash';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { SqlQuery } from 'src/app/services/sql-query';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit, OnEnter, OnDestroy {

  carsData: Array<CarData> = new Array<CarData>();
  offSetValues: any = 0;
  infinteEvent: any;
  private subscription: Subscription;
  totalCarDataCount: any;
  dataLoaded = false;
  filterValues: {
    brandName: string,
    available: string
  };
  query = '';
  params = [];
  showClearFilter = false;

  constructor(
    public carService: CarService,
    private router: Router,
  ) {

  }

  public async onEnter(): Promise<void> {
    // do your on enter page stuff here
    this.offSetValues = 0;
    this.getTotalCarCount();
    await this.checkFilters();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public async ngOnInit(): Promise<void> {
    await this.onEnter();
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/home-tabs-page/hometabs/home') {
        this.onEnter();
      }
    });
  }

  /**
   * Check filter is applied or not 
   * If yes then filter data accordingly. 
   */
  async checkFilters() {
    this.filterValues = await this.carService.getFilterData();
    console.log('in get data filter values', this.filterValues);
    if (!this.filterValues || (!this.filterValues.brandName && !this.filterValues.available)) {
      this.offSetValues = 0;
      this.query = SqlQuery.GET_CAR_DATA_OFFSET;
      this.params = [];
      await this.getCarData();
      this.showClearFilter = false;
    } else {
      //  filter condition with or option.
      if (this.filterValues.brandName && this.filterValues.available) {
        this.query = SqlQuery.GET_CAR_DATA_FILTER_BOTH;
        this.params = [this.filterValues.brandName, this.filterValues.available];
      } else if (this.filterValues.brandName && !this.filterValues.available) {
        this.query = SqlQuery.GET_CAR_DATA_FILTER_BRAND;
        this.params = [this.filterValues.brandName];
      } else if (!this.filterValues.brandName && this.filterValues.available) {
        this.query = SqlQuery.GET_CAR_DATA_FILTER_AVAILABLE;
        this.params = [this.filterValues.available];
      }
      this.getCarData();
      this.showClearFilter = true;

    }
  }


  async carDetails(carId: any) {
    this.router.navigate(['/car-detail', { carId }]);

  }
  async getCarData() {
    const optionResp: any = await this.carService.getCarDataOffset(this.offSetValues, this.query, this.params);
    if (this.offSetValues === 0) {
      this.carsData = optionResp;
    } else {
      this.carsData = _.union(this.carsData, optionResp);
    }
    this.dataLoaded = true;
    this.offSetValues = this.offSetValues + 10;
  }

  async getTotalCarCount() {
    this.totalCarDataCount = await this.carService.getDataCount();

  }

  async loadData(event) {
    this.infinteEvent = event;
    if (this.offSetValues < this.totalCarDataCount) {
      await this.getCarData();
      this.infinteEvent.target.complete();
    } else {
      this.infinteEvent.target.complete();
      this.infinteEvent.disabled = true;
    }
  }

  async filter() {
    this.carService.updateFilterData(this.filterValues);
    this.router.navigate(['/filter-option']);
  }

  async clearFilter() {
    this.carService.updateFilterData(undefined, true);
    await this.checkFilters();
  }

}

export interface OnEnter {
  onEnter(): Promise<void>;
}
