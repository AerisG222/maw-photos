import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
    @Input() yourRating: number;
    @Input() avgRating: number;
    @Output() rate = new EventEmitter<number>();

    onRate(rate: number): void {
        this.rate.emit(rate);
    }
}
