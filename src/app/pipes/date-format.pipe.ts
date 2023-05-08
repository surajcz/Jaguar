import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  constructor(
    public datePipe: DatePipe
  ) { }

  transform(value: any, ...args: unknown[]): unknown {
    return this.datePipe.transform(value, "yyyy-MM-dd");
  }

}
