import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNumbers'
})
export class RoundNumbersPipe implements PipeTransform {

  transform(value: number): unknown {
    return value.toFixed(1)
  }

}
