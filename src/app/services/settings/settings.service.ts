import { Injectable } from '@angular/core';
import { Api } from '../api.service';
import { SqlService } from '../sql.service';
import { DatabaseHelper } from '../database-helper.service';
import { SqlQuery } from '../sql-query';
import { ApplicationSettings } from '../application-settings.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(public api: Api,
    private sql: SqlService) { }


  async getSettings() {
    return this.sql
      .query(SqlQuery.GET_SETTINGS).then(settingsRes => {
        for (let i = 0; i < settingsRes.res.rows.length; i++) {
          const data = settingsRes.res.rows[i]
            ? settingsRes.res.rows[i]
            : settingsRes.res.rows.item(i);
          return data;
        }
      }).catch(e => console.log(e));
  }

  async deleteSettings() {
    return this.sql
      .query(SqlQuery.DELETE_SETTINGS_TABLE)
      .then(res => {
        console.log('Executed deleteing settings table', res);
      })
      .catch(e => console.log(e));
  }

  async insertSettings(data) {
    return this.sql
      .query(SqlQuery.INSERT_SETTINGS, [
        data.lang ? data.lang : ApplicationSettings.deviceLang,
        data.saveToGallery ? 'true' : 'false',
        ''
      ])
      .then(res => {
        return res;
        // console.log("Executed inserting inspection type", res);
      })
      .catch(e => console.log(e));
  }

}
