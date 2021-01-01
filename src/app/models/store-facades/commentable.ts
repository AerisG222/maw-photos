import { Observable } from 'rxjs';

import { Comment } from '../comment.model';

export abstract class Commentable {
    abstract comments$: Observable<Comment[]>;

    abstract addComment(comment: string): void;
}
