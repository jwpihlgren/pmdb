import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHours'
})
export class MinutesToHoursPipe implements PipeTransform {

  transform(minutes: number): string {
    const hours = Math.floor(minutes/ 60);
    const remainingMinutes = minutes - (hours * 60 )
    return `${hours}h ${remainingMinutes}m`
  }

}
