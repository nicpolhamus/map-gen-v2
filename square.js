/**
* @class
*/
var Square = (function () {
    /**
    * @constructs Square
    * @param {number} x
    * @param {number} y
    * @param {Direction} d
    */
    function Square(x, y, d) {
        this._x = x;
        this._y = y;
        this._dir = d;
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
    Object.defineProperty(Square.prototype, "dir", {
        /**
        * @function
        * @desc Getter for direction of Square
        */
        get: function () { return this._dir; },
        /**
        * @function
        * @param {Direction} val
        * @desc Setter for direction of Square
        */
        set: function (val) { this._dir = val; },
        enumerable: true,
        configurable: true
    });
    return Square;
}());
exports.Square = Square;
