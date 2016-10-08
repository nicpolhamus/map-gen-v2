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
    public map: string = '';
    width: number;
    length: number;
    rooms: number;
    constructor() {}
    generateMap(l: number = 20, w: number = 80, r: number = 25): void {
        let map = new Map(w,l,r);
        map.createMap();
        console.log(map.toString());
    }
}
