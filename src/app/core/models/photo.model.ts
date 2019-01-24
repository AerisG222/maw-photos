import { PhotoInfo } from './photo-info.model';

export interface Photo {
    id: number;
    categoryId: number;
    latitude: number;
    longitude: number;
    xsInfo: PhotoInfo;
    smInfo: PhotoInfo;
    mdInfo: PhotoInfo;
    lgInfo: PhotoInfo;
    prtInfo: PhotoInfo;
}
