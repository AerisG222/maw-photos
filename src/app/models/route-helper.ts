import { RouterStateSnapshot, Params } from '@angular/router';

import { CategoryTeaser } from './category-teaser';
import { CategoryTypeFilter } from './category-type-filter';
import { CategoryType } from './category-type';
import { RouteArea } from './route-area';
import { RouteDetails } from './route-details';

export const about = 'about';
export const categories = 'categories';
export const login = 'login';
export const photoCategories = 'photo-categories';
export const random = 'random';
export const search = 'search';
export const settings = 'settings';
export const stats = 'stats';
export const videoCategories = 'video-categories';

export const categoryViewGrid = 'grid';
export const categoryViewList = 'list';
export const categoryViewDefault = categoryViewGrid;

export const photoViewBulkEdit = 'bulk-edit';
export const photoViewDetail = 'detail';
export const photoViewFullscreen = 'fullscreen';
export const photoViewGrid = 'grid';
export const photoViewMap = 'map';
export const photoViewDefault = photoViewGrid;

export const searchViewGrid = 'grid';
export const searchViewList = 'list';
export const searchViewDefault = 'grid';

export const areaMap = [
    { urlStart: about, area: RouteArea.about },
    { urlStart: categories, area: RouteArea.categories },
    { urlStart: login, area: RouteArea.login },
    { urlStart: photoCategories, area: RouteArea.photos },
    { urlStart: random, area: RouteArea.random },
    { urlStart: search, area: RouteArea.search },
    { urlStart: settings, area: RouteArea.settings },
    { urlStart: stats, area: RouteArea.stats },
    { urlStart: videoCategories, area: RouteArea.videos },
];

export const aboutAbs = (section?: string): string => {
    let url = `/${about}`;

    if (section) {
        url += `/${section}`;
    }

    return url;
};

export const categoriesAbs = (
    view?: string,
    year?: number | string,
    type?: CategoryTypeFilter
): string => {
    let url = `/${categories}`;

    if (view) {
        url += `/${view}`;
    }

    if (year) {
        url += `?year=${year}`;
    }

    if (type) {
        url += `?type=${type}`;
    }

    return url;
};

export const loginAbs = (): string => {
    return `/${login}`;
};

export const photoCategoriesAbs = (
    view?: string,
    categoryId?: number,
    photoId?: number
): string => {
    let url = `/${photoCategories}`;

    if (categoryId) {
        url += `/${categoryId}`;
    }

    if (!!photoId && !view) {
        view = photoViewDefault;
    }

    if (view) {
        url += `/${view}`;
    }

    if (photoId) {
        if (!(view === photoViewBulkEdit || view === photoViewGrid)) {
            url += `/${photoId}`;
        }
    }

    return url;
};

export const randomAbs = (view?: string, photoId?: number): string => {
    let url = `/${random}`;

    if (!view) {
        view = photoViewDefault;
    }

    url += `/${view}`;

    if (photoId) {
        if (view !== photoViewGrid) {
            url += `/${photoId}`;
        }
    }

    return url;
};

export const searchAbs = (view?: string): string => {
    const url = `/${search}`;

    if (!view) {
        view = searchViewDefault;
    }

    return `${url}/${view}`;
};

export const settingsAbs = (): string => {
    return `/${settings}`;
};

export const statsAbs = (section?: string): string => {
    let url = `/${stats}`;

    if (section) {
        url += `/${section}`;
    }

    return url;
};

export const videoCategoriesAbs = (categoryId?: number, videoId?: number): string => {
    let url = `/${videoCategories}`;

    if (categoryId) {
        url += `/${categoryId}`;
    }

    if (videoId) {
        url += `/${videoId}`;
    }

    return url;
};

export const getArea = (url: string): RouteArea => {
    if (!url) {
        return RouteArea.unknown;
    }

    if (url.startsWith('/')) {
        url = url.substr(1);
    }

    for (const mapping of areaMap) {
        if (url.startsWith(mapping.urlStart)) {
            return mapping.area;
        }
    }

    return RouteArea.unknown;
};

export const getRouteDetails = (state: RouterStateSnapshot): RouteDetails => {
    return {
        area: RouteArea.categories,
        url: state.url,
        fragment: state.root.fragment,
        params: getRouteNestedParams(state),
        queryParams: state.root.queryParams,
        data: state.root.data,
    };
};

export const isCategoriesArea = (url: string): boolean => {
    return getArea(url) === RouteArea.categories;
};

export const doesRouteAreaNeedCategoryData = (
    area: RouteArea | undefined
): boolean => {
    return (
        area === RouteArea.categories ||
        area === RouteArea.photos ||
        area === RouteArea.random ||
        area === RouteArea.stats ||
        area === RouteArea.videos
    );
};

export const getCategoryRoute = (category?: CategoryTeaser): string | null => {
    if (!category) {
        return null;
    }

    return category.type === CategoryType.photo
        ? photoCategoriesAbs(undefined, category.id)
        : videoCategoriesAbs(undefined, category.id);
};

const getRouteNestedParams = (state: RouterStateSnapshot) => {
    let currentRoute = state?.root;
    let params: Params = {};

    while (currentRoute?.firstChild) {
        currentRoute = currentRoute.firstChild;
        params = {
            ...params,
            ...currentRoute.params,
        };
    }

    return params;
};
