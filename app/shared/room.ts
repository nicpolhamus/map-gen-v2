import { Direction } from './direction';
import { Square } from './square';

export class Room {
    /** @prop {number} _x   - x coord of Room */
    private _x: number;
    /** @prop {number} _y   - y coord of Room */
    private _y: number;
    /** @prop {number} _W   - width of Room */
    private _W: number;
    /** @prop {number} _L   - length of Room */
    private _L: number;
    /** @prop {Direction} _dir  - direction of Room*/
    private _dir: Direction;
    /** @prop {Array} _room   - room array of Room */
    private _room: Square[];

    /**
    * @constructs Room
    * @param {number} x
    * @param {number} y
    * @param {number} w
    * @param {number} l
    * @param {Direction} d
    */
    constructor(x: number, y: number, w: number, l: number, d: Direction) {
        this._x = x;
        this._y = y;
        this._W = w;
        this._L = l;
        this._dir = d;
        this._room = new Array<Square>(0);
        this.createRoom();
    }

    /**
    * @function createRoom
    * @desc Creates a room based off a Direction
    */
    private createRoom() {
        let xS = 0;
        let yS = 0;
        switch (this._dir) {
            case this._dir = Direction.North:
                for (xS = this.getLowerBounds(this._x, this._W); xS < this.getUpperBounds(this._x, this._W); xS++) {
                    for (yS = this._y; yS > this._y - this._L; yS--) {
                        this._room.push(new Square(xS, yS));
                    }
                }
                break;
            case this._dir = Direction.East:
                for (xS = this._x; xS < this._x + this._W; xS++) {
                    for (yS = this.getLowerBounds(this._y, this._L); yS < this.getUpperBounds(this._y, this._L); yS++) {
                        this._room.push(new Square(xS, yS));
                    }
                }
                break;
            case this._dir = Direction.South:
                for (xS = this.getLowerBounds(this._x, this._W); xS < this.getUpperBounds(this._x, this._W); xS++) {
                    for (yS = this._y; yS < this._y + this._L; yS++) {
                        this._room.push(new Square(xS, yS));
                    }
                }
                break;
            case this._dir = Direction.West:
                for (xS = this._x; xS > this._x - this._W; xS--) {
                    for (yS = this.getLowerBounds(this._y, this._L); yS < this.getUpperBounds(this._y, this._L); yS++) {
                        this._room.push(new Square(xS, yS));
                    }
                }
                break;
            default:
                break;
        }
    }

    /**
    * @function getLowerBounds
    * @param {number} i
    * @param {number} len
    * @returns {number}
    * @desc Gets lower bound of room
    */
    private getLowerBounds(i: number, len: number): number {
        return Math.floor(i - len / 2);
    }
    /**
    * @function getUpperBounds
    * @param {number} i
    * @param {number} len
    * @returns {number}
    * @desc Gets upper bound of room
    */
    private getUpperBounds(i: number, len: number): number {
        return Math.floor(i + (len + 1) / 2);
    }

    /**
    * @function
    * @returns {Array}
    * @desc Getter for a Room's room array
    */
    get room() { return this._room; }
}
