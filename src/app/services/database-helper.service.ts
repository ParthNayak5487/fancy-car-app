import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { SqlService } from './sql.service';
import { SqlQuery } from './sql-query';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TranslateService } from '@ngx-translate/core';
import * as textFilter from 'string-format';

const win: any = window;
@Injectable({
  providedIn: 'root'
})
export class DatabaseHelper {

  constructor(
    private sql: SqlService,
    public platform: Platform,
    public http: HttpClient,
    public ts: TranslateService) { }

  async getDistinctNames() {
    let brandNames: any = [];
    return this.sql
      .query(SqlQuery.GET_NAME_DISTINCT)
      .then(updateRes => {
        for (let i = 0; i < updateRes.res.rows.length; i++) {
          brandNames.push(updateRes.res.rows[i]
            ? updateRes.res.rows[i]
            : updateRes.res.rows.item(i));

        }
        return brandNames;
      }).catch(e => console.log(e));
  }


  async getHomeDispData(filterdValue: any): Promise<any> {
    const displayReturnData = [];
    let query = '';
    let param: any;
    // if (filterdValue) {
    //   query = SqlQuery.GET_LOCAL_DATA_HOME_DISPL_BY_APPCODE;
    //   param = [filterdValue];
    // } else {
    //   query = SqlQuery.GET_LOCAL_DATA_HOME_DISPL;
    //   param = [];
    // }
    return this.sql
      .query(query, param)
      .then(getResp => {
        for (let i = 0; i < getResp.res.rows.length; i++) {
          const data = getResp.res.rows[i]
            ? getResp.res.rows[i]
            : getResp.res.rows.item(i);
          displayReturnData.push(data);

        }
        return displayReturnData;
      })
      .catch(e => console.log(e));

  }


  async getReportDatByRespId(dataId: string): Promise<any> {
    // let reportData: any = null;
    // const tempData: DataSave = await this.sql
    //   .query(SqlQuery.GET_REPORT_DATA_BY_RESP_ID, [dataId])
    //   .then(getResp => {
    //     const data = getResp.res.rows[0]
    //       ? getResp.res.rows[0]
    //       : getResp.res.rows.item(0);
    //     reportData = data;
    //     console.log('report data', reportData);
    //     reportData.respId = reportData.resp_id;
    //     delete reportData.resp_id;
    //     reportData.submitData = reportData.submitData ? JSON.parse(reportData.submitData) : null;
    //     reportData.respData = reportData.respData ? JSON.parse(reportData.respData) : null;
    //     return reportData;
    //   })
    //   .catch(e => console.log(e));
    // return tempData;
  }

  /**
   * Clear all the tables from local DB.
   */

  clearDatabase(): Promise<boolean> {
    return this.sql.clearDatabase();
  }
}
