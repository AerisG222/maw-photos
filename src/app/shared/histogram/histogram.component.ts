import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { Photo } from 'src/app/core/models/photo.model';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
    selector: 'app-histogram',
    templateUrl: './histogram.component.html',
    styleUrls: ['./histogram.component.scss']
})
export class HistogramComponent {
    img: HTMLImageElement;

    @ViewChild('canvas') canvas: ElementRef;

    @Input() set photo(value: Photo) {
        if (this.img && value !== null && value.imageMd !== null) {
            this.img.src = value.imageMd.url;
        }
    }

    get canvasEl(): HTMLCanvasElement {
        return <HTMLCanvasElement>this.canvas.nativeElement;
    }

    constructor(@Inject(DOCUMENT) private doc) {
        this.img = <HTMLImageElement>doc.createElement('img');
        this.img.addEventListener('load', (evt) => this.onImageLoad(evt));
    }

    private onImageLoad(evt) {
        const data = this.getImageData();
        const hist = this.calcHistogram(data);

        this.drawHistogram(hist);
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
                maxCount = g[i];
            }

            if (b[i] > maxCount) {
                maxCount = b[i];
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
