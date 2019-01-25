export class Theme {
    static readonly themeDark = new Theme('Dark', 'maw-dark-theme');
    static readonly themeLight = new Theme('Light', 'maw-light-theme');

    static readonly allThemes = [
        Theme.themeDark,
        Theme.themeLight
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
            default:
                console.error(`invalid theme requested: ${name}`);
        }

        return null;
    }
}
