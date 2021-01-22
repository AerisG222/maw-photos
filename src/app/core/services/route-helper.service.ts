import { Injectable } from '@angular/core';
import { RouterStateSnapshot, Params } from '@angular/router';

import { RouteArea } from '@models';

@Injectable({
    providedIn: 'root'
})
export class RouteHelperService {
    static readonly about = 'about';
    static readonly categories = 'categories';
    static readonly login = 'login';
    static readonly photoCategories = 'photo-categories';
    static readonly random = 'random';
    static readonly search = 'search';
    static readonly settings = 'settings';
    static readonly stats = 'stats';
    static readonly videoCategories = 'video-categories';

    static readonly categoryViewGrid = 'grid';
    static readonly categoryViewList = 'list';
    static readonly categoryViewDefault = RouteHelperService.categoryViewGrid;

    static readonly photoViewBulkEdit = 'bulk-edit';
    static readonly photoViewDetail = 'detail';
    static readonly photoViewFullscreen = 'fullscreen';
    static readonly photoViewGrid = 'grid';
    static readonly photoViewMap = 'map';
    static readonly photoViewDefault = RouteHelperService.photoViewGrid;

    static readonly searchViewGrid = 'grid';
    static readonly searchViewList = 'list';
    static readonly searchViewDefault = 'grid';

    static readonly areaMap = [
        { urlStart: RouteHelperService.about,           area: RouteArea.about },
        { urlStart: RouteHelperService.categories,      area: RouteArea.categories },
        { urlStart: RouteHelperService.login,           area: RouteArea.login },
        { urlStart: RouteHelperService.photoCategories, area: RouteArea.photos },
        { urlStart: RouteHelperService.random,          area: RouteArea.random },
        { urlStart: RouteHelperService.search,          area: RouteArea.search },
        { urlStart: RouteHelperService.settings,        area: RouteArea.settings },
        { urlStart: RouteHelperService.stats,           area: RouteArea.stats },
        { urlStart: RouteHelperService.videoCategories, area: RouteArea.videos }
    ];

    aboutAbs(section?: string) {
        let url = `/${ RouteHelperService.about }`;

        if(!!section) {
            url += `/${section}`;
        }

        return url;
    }

    categoriesAbs(year?: number) {
        let url = `/${ RouteHelperService.categories }`;

        if(!!year) {
            url += `#${ year }`;
        }

        return url;
    }

    loginAbs() {
        return `/${ RouteHelperService.login }`;
    }

    photoCategoriesAbs(view?: string, categoryId?: number, photoId?: number) {
        let url = `/${ RouteHelperService.photoCategories }`;

        if(!!categoryId) {
            url += `/${ categoryId }`;
        }

        if(!!photoId && !!!view) {
            view = RouteHelperService.photoViewDefault;
        }

        if(!!view) {
            url += `/${ view }`;
        }

        if(!!photoId) {
            url += `/${ photoId }`;
        }

        return url;
    }

    randomAbs(view?: string, photoId?: number) {
        let url = `/${ RouteHelperService.random }`;

        if(!!!view) {
            view = RouteHelperService.photoViewDefault;
        }

        url += `/${ view }`;

        if(!!photoId) {
            url += `/${ photoId }`;
        }

        return url;
    }

    searchAbs() {
        return `/${ RouteHelperService.search }`;
    }

    settingsAbs() {
        return `/${ RouteHelperService.settings }`;
    }

    statsAbs(section?: string) {
        let url = `/${ RouteHelperService.stats }`;

        if(!!section) {
            url += `/${ section }`;
        }

        return url;
    }

    videoCategoriesAbs(categoryId?: number, videoId?: number) {
        let url = `/${ RouteHelperService.videoCategories }`;

        if(!!categoryId) {
            url += `/${ categoryId }`;
        }

        if(!!videoId) {
            url += `/${ videoId }`;
        }

        return url;
    }

    getArea = (url: string): RouteArea => {
        if(!!!url) {
            return RouteArea.unknown;
        }

        if(url.startsWith('/')) {
            url = url.substr(1);
        }

        for(const mapping of RouteHelperService.areaMap) {
            if(url.startsWith(mapping.urlStart)) {
                return mapping.area;
            }
        }

        return RouteArea.unknown;
    };

    getRouteDetails(state: RouterStateSnapshot) {
        return {
            area: RouteArea.categories,
            url: state.url,
            fragment: state.root.fragment,
            params: this.getRouteNestedParams(state),
            queryParams: state.root.queryParams,
            data: state.root.data
        };
    }

    isCategoriesArea(url: string) {
        return this.getArea(url) === RouteArea.categories;
    }

    private getRouteNestedParams(state: RouterStateSnapshot) {
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
    }
}
