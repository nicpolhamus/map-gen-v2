import { Component } from '@angular/core';

import { Map } from '../shared/map';
import { Direction } from '../shared/direction';
import { Tile } from '../shared/tile';
import { Square } from '../shared/square';
import { Room } from '../shared/room';
import { Random } from '../shared/random';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
    public mapString: string = '';
    width: number = 0;
    length: number = 0;
    rooms: number = 0;
    constructor() {}
    generateMap(l, w, r): void {
        let map = new Map(Number.parseInt(w),Number.parseInt(l),Number.parseInt(r));
        map.createMap();
        this.mapString = map.toString();
    }
}
