export class CategoryListType {
    static readonly grid = new CategoryListType('Grid');
    static readonly list = new CategoryListType('List');

    static readonly allTypes = [
        CategoryListType.grid,
        CategoryListType.list
    ];

    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    static forName(name: string): CategoryListType {
        switch (name) {
            case CategoryListType.grid.name:
                return CategoryListType.grid;
            case CategoryListType.list.name:
                return CategoryListType.list;
            default:
                console.error(`invalid category filter requested: ${name}`);
        }

        return null;
    }
}
