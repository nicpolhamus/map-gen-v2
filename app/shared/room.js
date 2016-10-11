"use strict";
var direction_1 = require('./direction');
var square_1 = require('./square');
var Room = (function () {
    /**
    * @constructs Room
    * @param {number} x
    * @param {number} y
    * @param {number} w
    * @param {number} l
    * @param {Direction} d
    */
    function Room(x, y, w, l, d) {
        this._x = x;
        this._y = y;
        this._W = w;
        this._L = l;
        this._dir = d;
        this._room = new Array(0);
        this.createRoom();
    }
    /**
    * @function createRoom
    * @desc Creates a room based off a Direction
    */
    Room.prototype.createRoom = function () {
        var xS = 0;
        var yS = 0;
        switch (this._dir) {
            case this._dir = direction_1.Direction.North:
                for (xS = this.getLowerBounds(this._x, this._W); xS < this.getUpperBounds(this._x, this._W); xS++) {
                    for (yS = this._y; yS > this._y - this._L; yS--) {
                        this._room.push(new square_1.Square(xS, yS));
                    }
                }
                break;
            case this._dir = direction_1.Direction.East:
                for (xS = this._x; xS < this._x + this._W; xS++) {
                    for (yS = this.getLowerBounds(this._y, this._L); yS < this.getUpperBounds(this._y, this._L); yS++) {
                        this._room.push(new square_1.Square(xS, yS));
                    }
                }
                break;
            case this._dir = direction_1.Direction.South:
                for (xS = this.getLowerBounds(this._x, this._W); xS < this.getUpperBounds(this._x, this._W); xS++) {
                    for (yS = this._y; yS < this._y + this._L; yS++) {
                        this._room.push(new square_1.Square(xS, yS));
                    }
                }
                break;
            case this._dir = direction_1.Direction.West:
                for (xS = this._x; xS > this._x - this._W; xS--) {
                    for (yS = this.getLowerBounds(this._y, this._L); yS < this.getUpperBounds(this._y, this._L); yS++) {
                        this._room.push(new square_1.Square(xS, yS));
                    }
                }
                break;
            default:
                break;
        }
    };
    /**
    * @function getLowerBounds
    * @param {number} i
    * @param {number} len
    * @returns {number}
    * @desc Gets lower bound of room
    */
    Room.prototype.getLowerBounds = function (i, len) {
        return i - len / 2;
    };
    /**
    * @function getUpperBounds
    * @param {number} i
    * @param {number} len
    * @returns {number}
    * @desc Gets upper bound of room
    */
    Room.prototype.getUpperBounds = function (i, len) {
        return i + (len + 1) / 2;
    };
    Object.defineProperty(Room.prototype, "room", {
        /**
        * @function
        * @returns {Array}
        * @desc Getter for a Room's room array
        */
        get: function () { return this._room; },
        enumerable: true,
        configurable: true
    });
    return Room;
}());
exports.Room = Room;
//# sourceMappingURL=room.js.map
