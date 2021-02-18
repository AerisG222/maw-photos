import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

export const helpAddComment = (
    id$: Observable<number | null>,
    comment: string,
    addComment: (id: number, comment: string) => void): void => {
        if(!comment) {
            return;
        }

        comment = comment.trim();

        if(comment.length === 0) {
            return;
        }

        id$.pipe(
            first()
        ).subscribe({
            next: id => {
                if(id) {
                    addComment(id, comment);
                }
            },
            error: err => console.log(`error trying to add comment: ${ err }`)
        });
};
