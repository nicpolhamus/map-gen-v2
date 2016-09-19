import { Room } from './Room';
import { Square } from './square';

class Map {
    /** @prop {number} _w   - width of the map */
    private _w: number;
    /** @prop {number} _l   - length of the map */
    private _l : number;
    /** @prop {Array} _map   - array of squares used as the map */
    private _map: Square[];
    constructor(w: number, l: number) {
        this._w = w;
        this._l = l;
    }
}
