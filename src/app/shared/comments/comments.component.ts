import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
    @Input() comments: Comment[];
    @Output() comment = new EventEmitter<string>();

    columnsToDisplay = ['entryDate', 'username', 'commentText'];

    onComment(comment: string): void {
        this.comment.emit(comment);
    }
}
