import { Category } from 'src/app/models/category.model';

export const getIdsByYear = (categories: Category[]): Map<number, number[]> => {
    const idsByYear = new Map<number, number[]>();

    for (const currCategory of categories) {
        if (!idsByYear.has(currCategory.year)) {
            idsByYear.set(currCategory.year, []);
        }

        const ids = idsByYear.get(currCategory.year) as number[];

        ids.push(currCategory.id);
    }

    return idsByYear;
};
