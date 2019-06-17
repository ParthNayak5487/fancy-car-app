import { Injectable } from '@angular/core';
import { SqlService } from './sql.service';
import { SqlQuery } from './sql-query';
import { CarData } from '../models/car-data';
import * as _ from 'lodash';
import * as textFilter from 'string-format';
import { Observable, Observer } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CarService {
  filterValues: {
    brandName: string,
    available: string
  };
  constructor(
    private sql: SqlService
  ) { }


  async getData(): Promise<any> {
    const carDatabaseData = [];
    return this.sql
      .query(SqlQuery.GET_CAR_DATA, [])
      .then(getResp => {
        for (let i = 0; i < getResp.res.rows.length; i++) {
          const data = getResp.res.rows[i]
            ? getResp.res.rows[i]
            : getResp.res.rows.item(i);
          carDatabaseData.push(data);

        }
        return carDatabaseData;
      })
      .catch(e => console.log(e));

  }

  async insertAllCarData(carsData: Array<CarData>) {
    // tslint:disable-next-line: prefer-for-of
    for (let item = 0; item < carsData.length; item++) {
      const car = carsData[item];
      car.img = await this.getBase64(car.img);
      await this.sql
        .query(SqlQuery.INSERT_CAR_DATA, [
          car.id, car.img, car.name, car.make, car.model, car.year, car.available, car.price
        ])
        .then(res => {
          // console.log('Executed inserting car data into mobile/local database', res);
        })
        .catch(e => {
          // console.log(e);
        });
    }

  }

  async deleteCarDatabase() {
    return this.sql
      .query(SqlQuery.DELETE_CAR_DATA_TABLE, [])
      .then(res => {
        console.log('Executed deleteing all car table data', res);
      })
      .catch(e => console.log(e));
  }

  async getCarDataOffset(offsetValue: any, query: any, params: any) {
    // console.log('offsetValue', offsetValue);
    query = textFilter(query, offsetValue);
    const returnDataOption: Array<CarData> = [];
    return this.sql
      .query(query, params)
      .then(optionRes => {
        for (let i = 0; i < optionRes.res.rows.length; i++) {
          const data: CarData = optionRes.res.rows[i]
            ? optionRes.res.rows[i]
            : optionRes.res.rows.item(i);
          // taskActivities.push(new JobcardTaskActivity(JSON.parse(data)));
          returnDataOption.push(data);
        }
        return returnDataOption;
      })
      .catch(e => console.log(e));
  }


  async getDataCount() {
    let countData = null;
    return this.sql
      .query(SqlQuery.GET_CAR_DATA_COUNT)
      .then(optionRes => {
        for (let i = 0; i < optionRes.res.rows.length; i++) {
          countData = optionRes.res.rows[i]
            ? optionRes.res.rows[i]
            : optionRes.res.rows.item(i);
        }
        return +JSON.stringify(countData['COUNT(*)']);
      })
      .catch(e => console.log(e));
  }

  async insertCarOrder(carDetail: any, orderDateTime: any) {
    return await this.sql
      .query(SqlQuery.INSERT_CAR_ORDER_DATA, [
        JSON.stringify(carDetail), orderDateTime + '_' + carDetail.id, orderDateTime
      ])
      .then(res => {
        // console.log('Executed inserting car data into mobile/local database', res);
      })
      .catch(e => console.log(e));
  }

  async updateDetailById(carId: any, carAvailable: string) {
    console.log(carId + '' + carAvailable)
    return this.sql
      .query(SqlQuery.UPDATE_CAR_AVAILABLE, [carAvailable, carId])
      .then(res => {
        console.log('Executed updating car data', res);
        return res;
      })
      .catch(e => console.log(e));
  }

  async getOrderDetail() {
    const orderList: any = [];

    return this.sql
      .query(SqlQuery.GET_ORDER_DATA)
      .then(orderResp => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < orderResp.res.rows.length; i++) {
          const order = orderResp.res.rows[i]
            ? orderResp.res.rows[i]
            : orderResp.res.rows.item(i);
          order.carData = JSON.parse(order.carData);
          orderList.push(order);
        }
        return orderList;
      })
      .catch(e => console.log(e));
  }

  async getCarDetail(id: any) {
    let carDetail: any;
    return await this.sql
      .query(SqlQuery.GET_CAR_DATA_BY_ID, [id])
      .then(optionRes => {
        console.log('oq', optionRes);
        if (optionRes.res.rows.length > 0) {
          carDetail = optionRes.res.rows[0]
            ? optionRes.res.rows[0]
            : optionRes.res.rows.item(0);
          return carDetail;
        } else {
          return null;
        }

      })
      .catch(e => console.log(e));
  }

  public getFilterData() {
    return this.filterValues;
  }

  public updateFilterData(setFilterValues: any, shouldClear?: boolean) {
    console.log('setFilterValues in updateReportDataSave', setFilterValues);
    if (shouldClear) {
      this.filterValues = null;
    } else {
      this.filterValues = setFilterValues;
      return this.filterValues;
    }

  }


  getBase64(image: any) {

    if (_.startsWith(image, 'http')) {
      return new Promise(async (resolve, reject) => {
        await this.getBase64ImageFromURL(image).subscribe(base64data => {
          resolve('data:image/png;base64,' + base64data);
        }, error => {
          resolve('');
        });
      });
    } else {
      return image;
    }

  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }


}
