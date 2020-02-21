import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { filter, take, map, tap } from 'rxjs/operators';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { transition, useAnimation, trigger } from '@angular/animations';

import { sidebarShow, sidebarHide, sidebarInfoPanelShow, sidebarInfoPanelHide } from '../animations';
import { CommentMode } from '../comments/comment-mode.model';
import { MetadataEditorMode } from '../metadata-editor/metadata-editor-mode.model';
import { MinimapMode } from '../minimap/minimap-mode.model';
import { RatingMode } from '../rating/rating-mode.model';
import { SettingsStoreActions, SettingsStoreSelectors, AuthStoreSelectors } from 'src/app/core/root-store';
import { CategoryTeaserChooserMode } from '../category-teaser-chooser/category-teaser-chooser-mode.model';

@Component({
    selector: 'app-video-info-panel',
    templateUrl: './video-info-panel.component.html',
    styleUrls: ['./video-info-panel.component.scss'],
    animations: [
        trigger('sidebarFlyInOut', [
            transition(':enter', [
                useAnimation(sidebarShow)
            ]),
            transition(':leave', [
                useAnimation(sidebarHide)
            ])
        ]),
        trigger('toggleInfoPanel', [
            transition(':enter', [
                useAnimation(sidebarInfoPanelShow)
            ]),
            transition(':leave', [
                useAnimation(sidebarInfoPanelHide)
            ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoInfoPanelComponent implements OnInit, OnDestroy {
    private hotkeys: Hotkey[] = [];

    commentMode = CommentMode;
    minimapMode = MinimapMode;
    ratingMode = RatingMode;
    metadataEditorMode = MetadataEditorMode;
    categoryTeaserChooserMode = CategoryTeaserChooserMode;

    isAdmin$: Observable<boolean>;
    endSidenavExpanded$: Observable<boolean>;
    showComments$: Observable<boolean>;
    showRatings$: Observable<boolean>;
    showMinimap$: Observable<boolean>;
    minimapUseDarkTheme$: Observable<boolean>;
    showMetadataEditor$: Observable<boolean>;
    showCategoryTeaserChooser$: Observable<boolean>;
    enableButtons$: Observable<boolean>;

    @ViewChild('toggleInfoPanelButton') toggleInfoPanelButton: MatButton;
    @ViewChild('toggleRatingsButton') toggleRatingsButton: MatButton;
    @ViewChild('toggleCommentsButton') toggleCommentsButton: MatButton;
    @ViewChild('toggleMinimapButton') toggleMinimapButton: MatButton;
    @ViewChild('toggleMetadataEditorButton') toggleMetadataEditorButton: MatButton;
    @ViewChild('toggleCategoryTeaserChooserButton') toggleCategoryTeaserChooserButton: MatButton;

    constructor(
        private store$: Store<{}>,
        private hotkeysService: HotkeysService
    ) { }

    ngOnInit() {
        this.isAdmin$ = this.store$.pipe(
            select(AuthStoreSelectors.selectIsAdmin),
            tap(isAdmin => {
                this.hotkeysService.remove(this.hotkeys);
                this.configureHotkeys(isAdmin);
            })
        );

        this.enableButtons$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelExpandedState)
        );

        this.endSidenavExpanded$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelExpandedState)
        );

        this.showCategoryTeaserChooser$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelShowCategoryTeaserChooser)
        );

        this.showComments$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelShowComments)
        );

        this.showMetadataEditor$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelShowMetadataEditor)
        );

        this.showMinimap$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelShowMinimap)
        );

        this.showRatings$ = this.store$.pipe(
            select(SettingsStoreSelectors.selectVideoInfoPanelShowRatings)
        );
    }

    ngOnDestroy() {
        this.hotkeysService.remove(this.hotkeys);
    }

    toggleEndSidenav(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoInfoPanelExpandedStateRequest());
    }

    toggleRatings(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoInfoPanelRatingsRequest());
    }

    toggleCategoryTeaserChooser(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoInfoPanelCategoryTeaserChooserRequest());
    }

    toggleComments(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoInfoPanelCommentsRequest());
    }

    toggleMetadataEditor(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoInfoPanelMetadataEditorRequest());
    }

    toggleMinimap(): void {
        this.store$.dispatch(SettingsStoreActions.toggleVideoInfoPanelMinimapRequest());
    }

    private configureHotkeys(isAdmin: boolean): void {
        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('i', (event: KeyboardEvent) => this.onHotkeyToggleEndSidenav(event), [], 'Show / Hide Info Panel')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('r', (event: KeyboardEvent) => this.onHotkeyToggleRatings(event), [], 'Show / Hide Ratings Panel')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('c', (event: KeyboardEvent) => this.onHotkeyToggleComments(event), [], 'Show / Hide Comments Panel')
        ) as Hotkey);

        this.hotkeys.push(this.hotkeysService.add(
            new Hotkey('m', (event: KeyboardEvent) => this.onHotkeyToggleMinimap(event), [], 'Show / Hide Minimap')
        ) as Hotkey);

        if(isAdmin) {
            this.hotkeys.push(this.hotkeysService.add(
                new Hotkey('z', (event: KeyboardEvent) => this.onHotkeyToggleMetadataEditor(event), [], 'Show / Hide Metadata Editor')
            ) as Hotkey);

            this.hotkeys.push(this.hotkeysService.add(
                new Hotkey('k', (event: KeyboardEvent) => this.onHotkeyToggleCategoryTeaserChooser(event), [], 'Show / Hide Category Teaser Chooser')
            ) as Hotkey);
        }
    }

    private onHotkeyToggleEndSidenav(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleInfoPanelButton);
        this.toggleEndSidenav();

        return false;
    }

    private onHotkeyToggleRatings(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleRatingsButton);
        this.togglePanel(this.showRatings$, () => this.toggleRatings());

        return false;
    }

    private onHotkeyToggleCategoryTeaserChooser(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleCategoryTeaserChooserButton);
        this.togglePanel(this.showCategoryTeaserChooser$, () => this.toggleCategoryTeaserChooser());

        return false;
    }

    private onHotkeyToggleComments(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleCommentsButton);
        this.togglePanel(this.showComments$, () => this.toggleComments());

        return false;
    }

    private onHotkeyToggleMetadataEditor(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleMetadataEditorButton);
        this.togglePanel(this.showMetadataEditor$, () => this.toggleMetadataEditor());

        return false;
    }

    private onHotkeyToggleMinimap(evt: KeyboardEvent): boolean {
        this.triggerButtonRipple(this.toggleMinimapButton);
        this.togglePanel(this.showMinimap$, () => this.toggleMinimap());

        return false;
    }

    private togglePanel(showPanel$: Observable<boolean>, toggleFunc: () => void): void {
        combineLatest([
            this.endSidenavExpanded$,
            showPanel$
        ]).pipe(
            filter(x => x[0] != null && x[1] != null),
            take(1),
            map(x => {
                if (!x[0]) {
                    // show info panel if hidden
                    this.toggleEndSidenav();

                    if (!x[1]) {
                        // if detail panel hidden, make sure we show this too
                        toggleFunc();
                    }
                } else {
                    toggleFunc();
                }
            })
        ).subscribe();
    }

    private triggerButtonRipple(button: MatButton) {
        if (button && !button.disabled) {
            button.ripple.launch({ centered: true });
        }
    }
}
