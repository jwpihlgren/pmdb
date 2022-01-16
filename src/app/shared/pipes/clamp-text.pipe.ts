import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clampText'
})
export class ClampTextPipe implements PipeTransform {

  transform(text: string, limit: number): unknown {
    return  text.length > limit ? text.split("").splice(0, limit).join("") + "..." : text
  }

}
