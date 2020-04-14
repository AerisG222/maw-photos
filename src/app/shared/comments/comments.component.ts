import { Component, Input, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Comment } from 'src/app/models/comment.model';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent implements OnInit {
    @Input() comments: Comment[];
    @Output() saveComment = new EventEmitter<string>();

    form: FormGroup;
    columnsToDisplay = ['entryDate', 'username', 'commentText'];

    constructor(
        private formBuilder: FormBuilder
    ) {

    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            comment: ['', Validators.required]
        });
    }

    onComment(): void {
        const comment = this.form.get('comment').value as string;

        this.saveComment.next(comment);

        this.clearNewComment();
    }

    onCancel(): void {
        this.clearNewComment();
    }

    saveSucceeded(): void {
        this.clearNewComment();
    }

    private clearNewComment(): void {
        this.form.get('comment').setValue('');
    }
}
