export class Theme {
    static readonly THEME_DARK = new Theme('Dark', 'maw-dark-theme');
    static readonly THEME_LIGHT = new Theme('Light', 'maw-light-theme');

    static readonly ALL_THEMES = [
        Theme.THEME_DARK,
        Theme.THEME_LIGHT
    ];

    readonly name: string;
    readonly klass: string;

    constructor(name: string, klass: string) {
        this.name = name;
        this.klass = klass;
    }

    static forName(name: string): Theme {
        switch (name) {
            case Theme.THEME_DARK.name:
                return Theme.THEME_DARK;
            case Theme.THEME_LIGHT.name:
                return Theme.THEME_LIGHT;
            default:
                console.error(`invalid theme requested: ${name}`);
        }

        return null;
    }
}
