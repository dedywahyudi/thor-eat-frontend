import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

@Pipe({
  name: 'datex'
})
export class DatexPipe implements PipeTransform {

  /**
   * transforms the value
   * @param value the value
   * @param format the format if any
   * @param hasTimeStamp if has time stamp
   */
  transform(value: any, format: string = ''): string {
    // Try and parse the passed value.
    if (_.isNil(value)) {
      return value;
    }

    if (!format) {
      value = Number(value);
      format = 'D MMMM YYYY';
    }

    const momentDate = moment(value);

    // If moment didn't understand the value, return it unformatted.
    if (!momentDate.isValid()) {
      return value;
    }

    // Otherwise, return the date formatted as requested.
    return momentDate.format(format);
  }

}
