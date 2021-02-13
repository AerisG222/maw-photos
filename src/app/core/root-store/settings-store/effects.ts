import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

import { SettingsService } from '@core/services/settings.service';
import * as SettingsActions from './actions';

@Injectable()
export class SettingsStoreEffects {
    loadRequest$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.loadRequest),
            concatMap(action => {
                const settings = this.settingsService.getAllSettings();
                return of(SettingsActions.loadSuccess({ settings }));
            })
        );
    });

    saveAppSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.saveAppSettings),
            map(({settings}) => {
                try {
                    this.settingsService.saveAppSettings(settings);
                    return SettingsActions.saveAppSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.saveAppSettingsFailure({ err });
                }
            })
        );
    });

    saveCategoryFilterSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.saveCategoryFilterSettings),
            map(({settings}) => {
                try {
                    this.settingsService.saveCategoryFilterSettings(settings);
                    return SettingsActions.saveCategoryFilterSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.saveCategoryFilterSettingsFailure({ err });
                }
            })
        );
    });

    saveCategoryGridViewSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.saveCategoryGridViewSettings),
            map(({settings}) => {
                try {
                    this.settingsService.saveCategoryGridViewSettings(settings);
                    return SettingsActions.saveCategoryGridViewSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.saveCategoryGridViewSettingsFailure({ err });
                }
            })
        );
    });

    saveCategoryListViewSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.saveCategoryListViewSettings),
            map(({settings}) => {
                try {
                    this.settingsService.saveCategoryListViewSettings(settings);
                    return SettingsActions.saveCategoryListViewSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.saveCategoryListViewSettingsFailure({ err });
                }
            })
        );
    });

    saveCategoryPageSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.saveCategoryPageSettings),
            map(({settings}) => {
                try {
                    this.settingsService.saveCategoryPageSettings(settings);
                    return SettingsActions.saveCategoryPageSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.saveCategoryPageSettingsFailure({ err });
                }
            })
        );
    });

    savePhotoDetailViewSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.savePhotoDetailViewSettings),
            map(({settings}) => {
                try {
                    this.settingsService.savePhotoDetailViewSettings(settings);
                    return SettingsActions.savePhotoDetailViewSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.savePhotoDetailViewSettingsFailure({ err });
                }
            })
        );
    });

    savePhotoGridViewSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.savePhotoGridViewSettings),
            map(({settings}) => {
                try {
                    this.settingsService.savePhotoGridViewSettings(settings);
                    return SettingsActions.savePhotoGridViewSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.savePhotoGridViewSettingsFailure({ err });
                }
            })
        );
    });

    savePhotoInfoPanelSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.savePhotoInfoPanelSettings),
            map(({settings}) => {
                try {
                    this.settingsService.savePhotoInfoPanelSettings(settings);
                    return SettingsActions.savePhotoInfoPanelSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.savePhotoInfoPanelSettingsFailure({ err });
                }
            })
        );
    });

    savePhotoMapViewSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.savePhotoMapViewSettings),
            map(({settings}) => {
                try {
                    this.settingsService.savePhotoMapViewSettings(settings);
                    return SettingsActions.savePhotoMapViewSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.savePhotoMapViewSettingsFailure({ err });
                }
            })
        );
    });

    savePhotoPageSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.savePhotoPageSettings),
            map(({settings}) => {
                try {
                    this.settingsService.savePhotoPageSettings(settings);
                    return SettingsActions.savePhotoPageSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.savePhotoPageSettingsFailure({ err });
                }
            })
        );
    });

    saveRandomDetailViewSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.saveRandomDetailViewSettings),
            map(({settings}) => {
                try {
                    this.settingsService.saveRandomDetailViewSettings(settings);
                    return SettingsActions.saveRandomDetailViewSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.saveRandomDetailViewSettingsFailure({ err });
                }
            })
        );
    });

    saveRandomGridViewSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.saveRandomGridViewSettings),
            map(({settings}) => {
                try {
                    this.settingsService.saveRandomGridViewSettings(settings);
                    return SettingsActions.saveRandomGridViewSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.saveRandomGridViewSettingsFailure({ err });
                }
            })
        );
    });

    saveRandomInfoPanelSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.saveRandomInfoPanelSettings),
            map(({settings}) => {
                try {
                    this.settingsService.saveRandomInfoPanelSettings(settings);
                    return SettingsActions.saveRandomInfoPanelSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.saveRandomInfoPanelSettingsFailure({ err });
                }
            })
        );
    });

    saveRandomPageSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.saveRandomPageSettings),
            map(({settings}) => {
                try {
                    this.settingsService.saveRandomPageSettings(settings);
                    return SettingsActions.saveRandomPageSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.saveRandomPageSettingsFailure({ err });
                }
            })
        );
    });

    saveSearchGridViewSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.saveSearchGridViewSettings),
            map(({settings}) => {
                try {
                    this.settingsService.saveSearchGridViewSettings(settings);
                    return SettingsActions.saveSearchGridViewSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.saveSearchGridViewSettingsFailure({ err });
                }
            })
        );
    });

    saveSearchListViewSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.saveSearchListViewSettings),
            map(({settings}) => {
                try {
                    this.settingsService.saveSearchListViewSettings(settings);
                    return SettingsActions.saveSearchListViewSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.saveSearchListViewSettingsFailure({ err });
                }
            })
        );
    });

    saveSearchPageSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.saveSearchPageSettings),
            map(({settings}) => {
                try {
                    this.settingsService.saveSearchPageSettings(settings);
                    return SettingsActions.saveSearchPageSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.saveSearchPageSettingsFailure({ err });
                }
            })
        );
    });

    saveVideoDetailViewSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.saveVideoDetailViewSettings),
            map(({settings}) => {
                try {
                    this.settingsService.saveVideoDetailViewSettings(settings);
                    return SettingsActions.saveVideoDetailViewSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.saveVideoDetailViewSettingsFailure({ err });
                }
            })
        );
    });

    saveVideoInfoPanelSettings$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SettingsActions.saveVideoInfoPanelSettings),
            map(({settings}) => {
                try {
                    this.settingsService.saveVideoInfoPanelSettings(settings);
                    return SettingsActions.saveVideoInfoPanelSettingsSuccess({ settings });
                } catch (err: unknown) {
                    return SettingsActions.saveVideoInfoPanelSettingsFailure({ err });
                }
            })
        );
    });

    constructor(
        private settingsService: SettingsService,
        private actions$: Actions
    ) {

    }
}
