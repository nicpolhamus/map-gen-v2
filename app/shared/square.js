"use strict";
/**
* @class
*/
var Square = (function () {
    /**
    * @constructs Square
    * @param {number} x
    * @param {number} y
    */
    function Square(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Square.prototype, "x", {
        /**
        * @function
        * @desc Getter for x coord of Square
        */
        get: function () { return this._x; },
        /**
        * @function
        * @param {number} val
        * @desc Setter for x coord of Square
        */
        set: function (val) { this._x = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Square.prototype, "y", {
        /**
        * @function
        * @desc Getter for y coord of Square
        */
        get: function () { return this._y; },
        /**
        * @function
        * @param {number} val
        * @desc Setter for y coord of Square
        */
        set: function (val) { this._y = val; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Square.prototype, "tile", {
        /**
        * @function
        * @desc Getter for tile type of Square
        */
        get: function () { return this._tile; },
        /**
        * @function
        * @param {Tile} val
        * @desc Setter for tile type of Square
        */
        set: function (val) { this._tile = val; },
        enumerable: true,
        configurable: true
    });
    return Square;
}());
exports.Square = Square;
//# sourceMappingURL=square.js.map