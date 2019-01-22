export const ASSET_PATH_SERVICE = 'ASSET_PATH_SERVICE';

export interface AssetPathService {
    getPath(path: string): string;
}
