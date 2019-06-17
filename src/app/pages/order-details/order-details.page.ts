import { Component, OnInit } from '@angular/core';
import { CarServerService } from 'src/app/services/backend-services/car-server.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  orderDetails: any;
  dataLoaded = false;
  constructor(
    public carService: CarService
  ) { }

  ngOnInit() {

  }

  async ionViewWillEnter() {
    this.orderDetails = await this.carService.getOrderDetail();
    this.dataLoaded = true;
  }

}
