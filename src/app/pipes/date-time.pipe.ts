import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationSettings } from '../services/application-settings.service';

@Pipe({
  name: 'dateformat'
})

export class DateTimePipe implements PipeTransform {
  constructor(private translate: TranslateService) {
  }

  transform(date: string, format?: string): any {
    if (date) {
      console.log(date);
      console.log(format);
      moment.locale(ApplicationSettings.deviceLang);
      return moment(date).format(format);
    }
    return '';
  }
}
