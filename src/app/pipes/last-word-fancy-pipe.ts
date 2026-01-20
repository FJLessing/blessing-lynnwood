import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lastWordFancy',
})
export class LastWordFancyPipe implements PipeTransform {
  transform(value: String, ...args: String[]): String {
    return (
      value.split(' ').slice(0, -1).join(' ') +
      ' <span class="font-family-secondary">' +
      value.split(' ').slice(-1) +
      '</span>'
    );
  }
}
