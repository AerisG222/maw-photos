import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
    @Input() comments: Comment[];
    @Output() comment = new EventEmitter<string>();

    form: FormGroup;
    columnsToDisplay = ['entryDate', 'username', 'commentText'];

    constructor(
        private _formBuilder: FormBuilder
    ) {

    }

    ngOnInit(): void {
        this.form = this._formBuilder.group({
            comment: ['', Validators.required]
        });
    }

    onComment(): void {
        const comment = <string>this.form.get('comment').value;

        if (comment) {
            this.comment.emit(comment);
        }
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
