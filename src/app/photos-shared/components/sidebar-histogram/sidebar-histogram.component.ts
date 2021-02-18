import { Component, ViewChild, ElementRef, Inject, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Histogram } from './histogram';
import { PhotoStoreSelectors } from '@core/root-store';

@Component({
    selector: 'app-photos-sidebar-histogram',
    templateUrl: './sidebar-histogram.component.html',
    styleUrls: ['./sidebar-histogram.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarHistogramComponent implements OnInit, OnDestroy {
    @ViewChild('canvas') canvas: ElementRef | null = null;

    form: FormGroup;
    img: HTMLImageElement;
    channel = 'rgb';

    get canvasEl(): HTMLCanvasElement {
        return this.canvas?.nativeElement as HTMLCanvasElement;
    }

    private destroySub = new Subscription();

    constructor(
        private store: Store,
        private formBuilder: FormBuilder,
        @Inject(DOCUMENT) private doc: Document
    ) {
        this.img = doc.createElement('img') ;
        this.img.crossOrigin = 'Anonymous';
        this.img.addEventListener('load', (evt) => this.onImageLoad());

        this.form = this.formBuilder.group({
            channel: ['rgb']
        });
    }

    ngOnInit(): void {
        this.destroySub.add(this.store.select(PhotoStoreSelectors.activePhoto)
            .subscribe({
                next: photo => {
                    if (this.img && !!photo?.imageMd) {
                        this.img.src = photo.imageMd.url;
                    }
                }
            })
        );

        // TODO: leverage rxjs to manage dom load event and form state...

        this.destroySub.add(this.form.get('channel')?.valueChanges
            .subscribe({
                next: val => {
                    this.channel = val;
                    this.onImageLoad();
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.destroySub.unsubscribe();
    }

    private onImageLoad(): void {
        const channel = this.channel;  // grab this here to make sure remaining tasks use consistent value
        const data = this.getImageData();
        const hist = this.calcHistogram(data);
        const maxCount = this.getMaxCount(channel, hist);

        this.drawHistogram(channel, hist, maxCount);
    }

    private getImageData(): Uint8ClampedArray {
        const tempCanvas = this.doc.createElement('canvas');

        tempCanvas.width = this.img.width;
        tempCanvas.height = this.img.height;

        const ctx = tempCanvas.getContext('2d') as CanvasRenderingContext2D;

        ctx.drawImage(this.img, 0, 0);

        return ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height).data;
    }

    // inspiration:
    //   http://mihai.sucan.ro/coding/svg-or-canvas/histogram.html
    //   https://thmsdnnr.com/projects/2018/03/09/draw-photo-histograms-d3-canvas.html
    private calcHistogram(data: Uint8ClampedArray): Histogram {
        const r = [];
        const g = [];
        const b = [];
        const lum = [];

        for (let i = 0; i < 256; i++) {
            r[i] = 0;
            g[i] = 0;
            b[i] = 0;
            lum[i] = 0;
        }

        // 4 because each pixel is stored as 4 consecutive elements: R G B A
        for (let i = 0; i < data.length; i += 4) {
            r[data[i + 0]]++;
            g[data[i + 1]]++;
            b[data[i + 2]]++;
            lum[this.getLuma(data[i + 0], data[i + 1], data[i + 2])]++;
        }

        return { r, g, b, lum };
    }

    private getLuma(r: number, g: number, b: number): number {
        // https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color
        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        return Math.round(luma);
    }

    private getMaxCount(channel: string, histogram: Histogram): number {
        let maxCount = 0;

        for (let i = 0; i < 256; i++) {
            if (this.includeR(channel) && histogram.r[i] > maxCount) {
                maxCount = histogram.r[i];
            }

            if (this.includeG(channel) && histogram.g[i] > maxCount) {
                maxCount = histogram.g[i];
            }

            if (this.includeB(channel) && histogram.b[i] > maxCount) {
                maxCount = histogram.b[i];
            }

            if (channel === 'lum' && histogram.lum[i] > maxCount) {
                maxCount = histogram.lum[i];
            }
        }

        return maxCount;
    }

    private drawHistogram(channel: string, histogram: Histogram, maxCount: number): void {
        const ctx = this.canvasEl.getContext('2d') as CanvasRenderingContext2D;

        ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);

        ctx.globalCompositeOperation = 'lighter';

        if (this.includeR(channel)) {
            this.drawHistogramChannel(ctx, '#f00', maxCount, histogram.r);
        }

        if (this.includeG(channel)) {
            this.drawHistogramChannel(ctx, '#0f0', maxCount, histogram.g);
        }

        if (this.includeB(channel)) {
            this.drawHistogramChannel(ctx, '#00f', maxCount, histogram.b);
        }

        if (channel === 'lum') {
            this.drawHistogramChannel(ctx, '#777', maxCount, histogram.lum);
        }

        ctx.globalCompositeOperation = 'source-over';
    }

    private drawHistogramChannel(ctx: CanvasRenderingContext2D, color: string, maxCount: number, vals: number[]): void {
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.moveTo(0, this.canvasEl.height);

        for (let x, y, i = 0; i <= 255; i++) {
            if (!(i in vals)) {
                continue;
            }

            y = Math.round((vals[i] / maxCount) * this.canvasEl.height);
            x = Math.round((i / 255) * this.canvasEl.width);

            ctx.lineTo(x, this.canvasEl.height - y);
        }

        ctx.lineTo(this.canvasEl.width, this.canvasEl.height);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

    private includeR(channel: string): boolean {
        return channel === 'rgb' || channel === 'r';
    }

    private includeG(channel: string): boolean {
        return channel === 'rgb' || channel === 'g';
    }

    private includeB(channel: string): boolean {
        return channel === 'rgb' || channel === 'b';
    }
}
