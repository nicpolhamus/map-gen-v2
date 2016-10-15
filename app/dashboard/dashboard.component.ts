/// <reference path="../../typings/globals/jquery/index.d.ts" />


import { Component } from '@angular/core';

import 'bootstrap';

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
    validationText: string;
    constructor() {}
    generateMap(l, w, r): void {
        if (this.validateInput(l,w,r)) {
            let map = new Map(Number.parseInt(w),Number.parseInt(l),Number.parseInt(r));
            map.createMap();
            this.mapString = map.toString();
        } else {
            this.mapString = '';
        }
    }
    private validateInput(l, w, r): boolean {
        l = Number.parseInt(l);
        w = Number.parseInt(w);
        r = Number.parseInt(r);
        let valid: boolean = false;
        this.validationText = '';
        if (l > 0 && w > 0 && r > 0) {
            if (l > 200) {
                this.validationText += 'Length needs to be less than 200!' + '\n';
            } if (w > 200) {
                this.validationText += 'Width needs to be less than 200!' + '\n';
            } if (r > ((l+w)/2)) {
                this.validationText += 'Rooms need to be less than Length + Width divided by two!' + '\n';
            } else {
                valid = true;
            }

            if (!valid) {
                $('#validation-modal').modal('show');
            }
        } else {
            this.validationText = 'Length, Width, and Rooms need to be greater than 0!';
            $('#validation-modal').modal('show');
        }
        return valid;
    }
}
