export const assetPathServiceToken = 'AssetPathService';

export interface AssetPathService {
    getPath(path: string): string;
}
