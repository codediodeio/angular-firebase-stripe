import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {
  transform(obj: any): any[] {

    return Object.keys(obj).map(k => {
      return { key: k, value: obj[k] }
    })
  }
}
