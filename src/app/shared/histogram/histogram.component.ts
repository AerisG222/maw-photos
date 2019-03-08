import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { Photo } from 'src/app/core/models/photo.model';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'app-histogram',
    templateUrl: './histogram.component.html',
    styleUrls: ['./histogram.component.scss']
})
export class HistogramComponent implements OnDestroy, AfterViewInit {
    imageUrl: string;

    @ViewChild('img') img: ElementRef;
    @ViewChild('canvas') canvas: ElementRef;

    @Input() set photo(value: Photo) {
        if (value !== null && value.imageMd !== null) {
            this.imageUrl = value.imageMd.url;
        }
    }

    get imgEl(): HTMLImageElement {
        return <HTMLImageElement>this.img.nativeElement;
    }

    get canvasEl(): HTMLCanvasElement {
        return <HTMLCanvasElement>this.canvas.nativeElement;
    }

    constructor(@Inject(DOCUMENT) private doc) {

    }

    ngAfterViewInit() {
        this.imgEl.addEventListener('load', this.onImageLoad);
    }

    ngOnDestroy(): void {
        this.imgEl.removeEventListener('load', this.onImageLoad);
    }

    private onImageLoad(evt) {
        const data = this.getImageData();
        const hist = this.calcHistogram(data);

        this.drawHistogram(hist);
    }

    private getImageData() {
        const tempCanvas = this.doc.createElement('canvas');

        tempCanvas.width = this.imgEl.width;
        tempCanvas.height = this.imgEl.height;

        const ctx = <CanvasRenderingContext2D>tempCanvas.getContext('2d');

        ctx.drawImage(this.imgEl, 0, 0);

        return ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height).data;
    }

    // inspiration:
    //   http://mihai.sucan.ro/coding/svg-or-canvas/histogram.html
    //   https://thmsdnnr.com/projects/2018/03/09/draw-photo-histograms-d3-canvas.html
    private calcHistogram(data: Uint8ClampedArray) {
        const r = [];
        const g = [];
        const b = [];
        const step = 4;
        let maxCount = 0;

        for (let i = 0; i < 256; i++) {
            r[i] = 0;
            g[i] = 0;
            b[i] = 0;
        }

        // 4 because each pixel is stored as 4 consecutive elements: R G B A
        for (let i = 0; i < data.length; i += 4) {
            r[data[i + 0]]++;
            g[data[i + 1]]++;
            b[data[i + 2]]++;
        }

        for (let i = 0; i < 256; i++) {
            if (r[i] > maxCount) {
                maxCount = r[i];
            }

            if (g[i] > maxCount) {
                maxCount = r[i];
            }

            if (b[i] > maxCount) {
                maxCount = r[i];
            }
        }

        return { r: r, g: g, b: b, maxCount: maxCount };
    }

    private drawHistogram(histogram) {
        const ctx = this.canvasEl.getContext('2d');
        ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);

        ctx.globalCompositeOperation = 'lighter';

        this.drawHistogramChannel(ctx, '#f00', histogram.maxCount, histogram.r);
        this.drawHistogramChannel(ctx, '#0f0', histogram.maxCount, histogram.g);
        this.drawHistogramChannel(ctx, '#00f', histogram.maxCount, histogram.b);

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
}
