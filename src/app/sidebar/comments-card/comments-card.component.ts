import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { Commentable } from '@models';

@Component({
    selector: 'app-sidebar-comments-card',
    templateUrl: './comments-card.component.html',
    styleUrls: ['./comments-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsCardComponent {
    form: UntypedFormGroup;
    columnsToDisplay = ['entryDate', 'username', 'commentText'];

    constructor(
        private formBuilder: UntypedFormBuilder,
        public commentable: Commentable
    ) {
        this.form = this.formBuilder.group({
            comment: ['', Validators.required],
        });
    }

    onComment(): void {
        const comment = this.form.get('comment')?.value as string;

        this.commentable.addComment(comment);

        this.clearNewComment();
    }

    onCancel(): void {
        this.clearNewComment();
    }

    saveSucceeded(): void {
        this.clearNewComment();
    }

    private clearNewComment(): void {
        this.form.get('comment')?.setValue('');
    }
}
