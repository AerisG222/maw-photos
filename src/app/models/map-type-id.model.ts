export class MapTypeId {
    static readonly ROADMAP = new MapTypeId('roadmap',     'Roadmap');
    static readonly HYBRID = new MapTypeId('hybrid',       'Hybrid');
    static readonly SATELLITE = new MapTypeId('satellite', 'Satellite');
    static readonly TERRAIN = new MapTypeId('terrain',     'Terrain');

    static readonly allTypeIds = [
        MapTypeId.ROADMAP,
        MapTypeId.HYBRID,
        MapTypeId.SATELLITE,
        MapTypeId.TERRAIN
    ];

    constructor(public value: string, public name: string) {
        this.value = value;
        this.name = name;
    }
}
