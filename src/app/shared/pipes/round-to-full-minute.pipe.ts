import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundToFullMinute'
})
export class RoundToFullMinutePipe implements PipeTransform {

  transform(value: number): unknown {
    console.log(value)
    return Math.round(value);
  }

}
