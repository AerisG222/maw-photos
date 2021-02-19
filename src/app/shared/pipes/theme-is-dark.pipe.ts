import { Pipe, PipeTransform } from '@angular/core';

import { Theme, toThemeDefaulted, toThemeDetail } from '@models';

@Pipe({
    name: 'themeIsDark',
})
export class ThemeIsDarkPipe implements PipeTransform {
    transform(value: Theme | null): boolean {
        const themeDetail = toThemeDetail(toThemeDefaulted(value));

        return themeDetail.isDark;
    }
}
