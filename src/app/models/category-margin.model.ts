export class CategoryMargin {
    static readonly dense = new CategoryMargin('Dense', '');
    static readonly compact = new CategoryMargin('Compact', 'category-margin-ten');
    static readonly comfy = new CategoryMargin('Comfy', 'category-margin-twenty');
    static readonly cozy = new CategoryMargin('Cozy', 'category-margin-thirty');

    static readonly allCategoryMargins = [
        CategoryMargin.dense,
        CategoryMargin.compact,
        CategoryMargin.comfy,
        CategoryMargin.cozy
    ];

    readonly name: string;
    readonly klass: string;

    constructor(name: string, klass: string) {
        this.name = name;
        this.klass = klass;
    }

    static forName(name: string): CategoryMargin {
        switch (name) {
            case CategoryMargin.dense.name:
                return CategoryMargin.dense;
            case CategoryMargin.compact.name:
                return CategoryMargin.compact;
            case CategoryMargin.comfy.name:
                return CategoryMargin.comfy;
            case CategoryMargin.cozy.name:
                return CategoryMargin.cozy;
            default:
                console.error(`invalid category margin requested: ${name}`);
        }

        return CategoryMargin.compact;
    }

    static nextSize(name: string): CategoryMargin {
        switch (name) {
            case CategoryMargin.dense.name:
                return CategoryMargin.compact;
            case CategoryMargin.compact.name:
                return CategoryMargin.comfy;
            case CategoryMargin.comfy.name:
                return CategoryMargin.cozy;
            case CategoryMargin.cozy.name:
                return CategoryMargin.dense;
            default:
                console.error(`invalid category margin requested: ${name}`);
        }

        return CategoryMargin.compact;
    }
}
