export const ASSET_PATH_SERVICE = 'ASSET_PATH_SERVICE';

export interface IAssetPathService {
    getPath(path: string): string;
}
