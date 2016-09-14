import { Direction } from './Direction';
/**
* @class
*/
class Square {
    /** @prop {number} _x  - x coord of Square */
    _x: number;
    /** @prop {number} _y  - y coord of Square */
    _y: number;
    /** @prop {Direction} _dir  - direction of Square */
    _dir: Direction;

    /**
    * @constructs Square
    * @param {number} x
    * @param {number} y
    * @param {Direction} d
    */
    constructor(x: number, y: number, d: Direction) {
        this._x = x;
        this._y = y;
        this._dir = d;
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
    * @desc Getter for direction of Square
    */
    get dir() { return this._dir; }
    /**
    * @function
    * @param {Direction} val
    * @desc Setter for direction of Square
    */
    set dir(val: Direction) { this._dir = val; }
}

export { Square };
