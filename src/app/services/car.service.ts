import { Injectable } from '@angular/core';
import { SqlService } from './sql.service';
import { SqlQuery } from './sql-query';
import { CarData } from '../models/car-data';
import * as _ from 'lodash';
import * as textFilter from 'string-format';
@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(
    private sql: SqlService,
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
    for (const car of carsData) {
      await this.sql
        .query(SqlQuery.INSERT_CAR_DATA, [
          car.id, car.img, car.name, car.make, car.model, car.year, null
        ])
        .then(res => {
          // console.log('Executed inserting car data into mobile/local database', res);
        })
        .catch(e => console.log(e));
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

  async getCarDataOffset(offsetValue: any) {
    console.log('offsetValue', offsetValue);
    const returnDataOption: Array<CarData> = [];
    const query = textFilter(SqlQuery.GET_CAR_DATA_OFFSET, offsetValue);
    console.log('query', query);
    return this.sql
      .query(query)
      .then(optionRes => {
        for (let i = 0; i < optionRes.res.rows.length; i++) {
          const data: CarData = optionRes.res.rows[i]
            ? optionRes.res.rows[i]
            : optionRes.res.rows.item(i);
          // taskActivities.push(new JobcardTaskActivity(JSON.parse(data)));
          returnDataOption.push(data);
        }
        // console.log(returnDataOption);
        return returnDataOption;
      })
      .catch(e => console.log(e));
  }

  async getDataCount() {
    let countData = null;
    return this.sql
      .query(SqlQuery.GET_CAR_DATA_COUNT)
      .then(optionRes => {
        console.log(optionRes.res.rows.length);
        for (let i = 0; i < optionRes.res.rows.length; i++) {
          countData = optionRes.res.rows[i]
            ? optionRes.res.rows[i]
            : optionRes.res.rows.item(i);
        }
        return +JSON.stringify(countData['COUNT(*)']);
      })
      .catch(e => console.log(e));
  }

}
