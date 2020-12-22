export class MapTypeId {
    static readonly roadmap = new MapTypeId('roadmap',     'Roadmap');
    static readonly hybrid = new MapTypeId('hybrid',       'Hybrid');
    static readonly satellite = new MapTypeId('satellite', 'Satellite');
    static readonly terrain = new MapTypeId('terrain',     'Terrain');

    static readonly allTypeIds = [
        MapTypeId.roadmap,
        MapTypeId.hybrid,
        MapTypeId.satellite,
        MapTypeId.terrain
    ];

    constructor(public value: string, public name: string) {
        this.value = value;
        this.name = name;
    }
}
