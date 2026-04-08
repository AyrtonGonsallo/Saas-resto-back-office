import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanText',
  standalone: true
})
export class CleanTextPipe implements PipeTransform {

  private decodeHtml(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  transform(value: string): string {
    if (!value) return '';

    // 1. remove HTML tags
    let text = value.replace(/<[^>]*>/g, '');

    // 2. decode entities (&#233;, &nbsp;, etc)
    text = this.decodeHtml(text);

    return text;
  }
}