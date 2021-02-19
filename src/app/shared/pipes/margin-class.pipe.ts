import { Pipe, PipeTransform } from '@angular/core';
import { Margin } from '@models';

@Pipe({
    name: 'marginClass',
})
export class MarginClassPipe implements PipeTransform {
    transform(margin: Margin | null): string | null {
        switch (margin) {
            case Margin.compact:
                return 'category-margin-ten';
            case Margin.comfy:
                return 'category-margin-twenty';
            case Margin.cozy:
                return 'category-margin-thirty';
            case Margin.dense:
            default:
                return '';
        }
    }
}
