import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { Photo, Video } from '@models';

export const helpSaveCategoryTeaser = (
    activePhoto$: Observable<Photo | Video | null>,
    setTeaser: (categoryId: number, id: number) => void) => {
    activePhoto$.pipe(
            first()
        ).subscribe({
            next: photoOrVideo => {
                if(photoOrVideo) {
                    setTeaser(photoOrVideo.categoryId, photoOrVideo.id);
                }
            },
            error: err => console.log(`error trying to set category teaser: ${ err }`)
        });
};
