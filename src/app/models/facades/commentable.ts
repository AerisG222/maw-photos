import { Observable } from 'rxjs';

import { Comment } from '@models';

export abstract class Commentable {
    abstract comments$: Observable<Comment[]>;

    abstract addComment(comment: string): void;
}
