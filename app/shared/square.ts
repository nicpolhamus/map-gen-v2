import { Tile } from './tile';
/**
* @class
*/
export class Square {
    /** @prop {number} _x  - x coord of Square */
    _x: number;
    /** @prop {number} _y  - y coord of Square */
    _y: number;
    /** @prop {Tile} _tile  - tile type of Square */
    _tile: Tile;
    /**
    * @constructs Square
    * @param {number} x
    * @param {number} y
    */
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    /**
    * @function
    * @desc Getter for x coord of Square
    */
    get x() { return this._x; }
    /**
    * @function
    * @param {number} val
    * @desc Setter for x coord of Square
    */
    set x(val: number) { this._x = val; }
    /**
    * @function
    * @desc Getter for y coord of Square
    */
    get y() { return this._y; }
    /**
    * @function
    * @param {number} val
    * @desc Setter for y coord of Square
    */
    set y(val: number) { this._y = val; }
    /**
    * @function
    * @desc Getter for tile type of Square
    */
    get tile() { return this._tile; }
    /**
    * @function
    * @param {Tile} val
    * @desc Setter for tile type of Square
    */
    set tile(val: Tile) { this._tile = val; }
}
