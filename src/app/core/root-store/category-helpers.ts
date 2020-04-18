import { Category } from 'src/app/models/category.model';

export function getIdsByYear(categories: Category[]): {} {
    const idsByYear = {};

    for (const currCategory of categories) {
        if (!(currCategory.year in idsByYear)) {
            idsByYear[currCategory.year] = [];
        }

        idsByYear[currCategory.year].push(currCategory.id);
    }

    return idsByYear;
}
