export class Theme {
    static readonly themeDark = new Theme('Dark', 'maw-dark-theme');
    static readonly themeLight = new Theme('Light', 'maw-light-theme');
    static readonly themeMulledWine = new Theme('Mulled Wine', 'maw-mulled-wine-theme');
    static readonly themeOcean = new Theme('Ocean', 'maw-ocean-theme');
    static readonly themePaleNight = new Theme('Pale Night', 'maw-pale-night-theme');

    static readonly allThemes = [
        Theme.themeDark,
        Theme.themeLight,
        Theme.themeMulledWine,
        Theme.themeOcean,
        Theme.themePaleNight
    ];

    readonly name: string;
    readonly klass: string;

    constructor(name: string, klass: string) {
        this.name = name;
        this.klass = klass;
    }

    static forName(name: string): Theme {
        switch (name) {
            case Theme.themeDark.name:
                return Theme.themeDark;
            case Theme.themeLight.name:
                return Theme.themeLight;
            case Theme.themeMulledWine.name:
                return Theme.themeMulledWine;
            case Theme.themeOcean.name:
                return Theme.themeOcean;
            case Theme.themePaleNight.name:
                return Theme.themePaleNight;
            default:
                console.error(`invalid theme requested: ${name}`);
        }

        return null;
    }
}
