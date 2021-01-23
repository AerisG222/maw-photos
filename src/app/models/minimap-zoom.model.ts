export class MinimapZoom {
    static readonly allSizes = [
        new MinimapZoom(1, '1 - World'),
        new MinimapZoom(2, '2'),
        new MinimapZoom(3, '3'),
        new MinimapZoom(4, '4'),
        new MinimapZoom(5, '5 - Landmass/continent'),
        new MinimapZoom(6, '6'),
        new MinimapZoom(7, '7'),
        new MinimapZoom(8, '8'),
        new MinimapZoom(9, '9'),
        new MinimapZoom(10, '10 - City'),
        new MinimapZoom(11, '11'),
        new MinimapZoom(12, '12'),
        new MinimapZoom(13, '13'),
        new MinimapZoom(14, '14'),
        new MinimapZoom(15, '15 - Streets'),
        new MinimapZoom(16, '16'),
        new MinimapZoom(17, '17'),
        new MinimapZoom(18, '18'),
        new MinimapZoom(19, '19'),
        new MinimapZoom(20, '20 - Buildings'),
        new MinimapZoom(21, '21'),
        new MinimapZoom(22, '22')
    ];

    constructor(public value: number, public name: string) {
        this.value = value;
        this.name = name;
    }
}
