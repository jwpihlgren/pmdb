import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundToFullMinute'
})
export class RoundToFullMinutePipe implements PipeTransform {

  transform(value: number): unknown {
    return Math.round(value);
  }

}
