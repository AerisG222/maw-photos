export class Margin {
    static readonly dense = new Margin('Dense', '');
    static readonly compact = new Margin('Compact', 'category-margin-ten');
    static readonly comfy = new Margin('Comfy', 'category-margin-twenty');
    static readonly cozy = new Margin('Cozy', 'category-margin-thirty');

    static readonly allCategoryMargins = [
        Margin.dense,
        Margin.compact,
        Margin.comfy,
        Margin.cozy
    ];

    readonly name: string;
    readonly klass: string;

    constructor(name: string, klass: string) {
        this.name = name;
        this.klass = klass;
    }

    static forName(name: string): Margin {
        switch (name) {
            case Margin.dense.name:
                return Margin.dense;
            case Margin.compact.name:
                return Margin.compact;
            case Margin.comfy.name:
                return Margin.comfy;
            case Margin.cozy.name:
                return Margin.cozy;
            default:
                console.error(`invalid category margin requested: ${name}`);
        }

        return Margin.compact;
    }

    static nextSize(name: string): Margin {
        switch (name) {
            case Margin.dense.name:
                return Margin.compact;
            case Margin.compact.name:
                return Margin.comfy;
            case Margin.comfy.name:
                return Margin.cozy;
            case Margin.cozy.name:
                return Margin.dense;
            default:
                console.error(`invalid category margin requested: ${name}`);
        }

        return Margin.compact;
    }
}
