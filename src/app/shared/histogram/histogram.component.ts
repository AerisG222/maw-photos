import { Component, Input, ViewChild, ElementRef, Inject, OnInit, OnDestroy } from '@angular/core';
import { Photo } from 'src/app/core/models/photo.model';
import { DOCUMENT } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';
import { Histogram } from './histogram';

@Component({
    selector: 'app-histogram',
    templateUrl: './histogram.component.html',
    styleUrls: ['./histogram.component.scss']
})
export class HistogramComponent implements OnInit, OnDestroy {
    form: FormGroup;
    img: HTMLImageElement;
    channel = 'rgb';
    destroy$ = new Subject<boolean>();

    @ViewChild('canvas') canvas: ElementRef;

    @Input() set photo(value: Photo) {
        if (this.img && value !== null && value.imageMd !== null) {
            this.img.src = value.imageMd.url;
        }
    }

    get canvasEl(): HTMLCanvasElement {
        return <HTMLCanvasElement>this.canvas.nativeElement;
    }

    constructor(
        private _formBuilder: FormBuilder,
        @Inject(DOCUMENT) private doc
    ) {
        this.img = <HTMLImageElement>doc.createElement('img');
        this.img.addEventListener('load', (evt) => this.onImageLoad());
    }

    ngOnInit() {
        this.form = this._formBuilder.group({
            channel: ['rgb']
        });

        // TODO: leverage rxjs to manage dom load event and form state...

        this.form.get('channel').valueChanges
            .pipe(
                tap(val => this.channel = val),
                tap(val => this.onImageLoad()),
                takeUntil(this.destroy$)
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.destroy$.next(true);
    }

    private onImageLoad() {
        const channel = this.channel;  // grab this here to make sure remaining tasks use consistent value
        const data = this.getImageData();
        const hist = this.calcHistogram(data);
        const maxCount = this.getMaxCount(channel, hist);

        this.drawHistogram(channel, hist, maxCount);
    }

    private getImageData() {
        const tempCanvas = this.doc.createElement('canvas');

        tempCanvas.width = this.img.width;
        tempCanvas.height = this.img.height;

        const ctx = <CanvasRenderingContext2D>tempCanvas.getContext('2d');

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
        const step = 4;

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

        return {
            r: r,
            g: g,
            b: b,
            lum: lum
        };
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
        const ctx = this.canvasEl.getContext('2d');
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

    private drawHistogramChannel(ctx, color, maxCount, vals) {
        const ctxStyle = 'strokeStyle';

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

    private includeR(channel: string) {
        return channel === 'rgb' || channel === 'r';
    }

    private includeG(channel: string) {
        return channel === 'rgb' || channel === 'g';
    }

    private includeB(channel: string) {
        return channel === 'rgb' || channel === 'b';
    }
}