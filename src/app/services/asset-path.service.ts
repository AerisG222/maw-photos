export const assetPathServiceToken = 'assetPathService';

export interface AssetPathService {
    getPath(path: string): string;
}
