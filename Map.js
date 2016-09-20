var tile_1 = require('./tile');
var direction_1 = require('./direction');
var Room_1 = require('./Room');
var random_1 = require('./random');
var Map = (function () {
    /**
    * @constructs map
    * @param {number} w
    * @param {number} l
    */
    function Map(w, l) {
        /** @member {Number} @desc room percentage, SUBJECT TO CHANGE */
        this._roomAmount = 25;
        this._random = new random_1.Random();
        this._w = w;
        this._l = l;
        this._map = [w * l];
    }
    Object.defineProperty(Map.prototype, "W", {
        get: function () { return this._w; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "L", {
        get: function () { return this._l; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "map", {
        get: function () { return this._map; },
        enumerable: true,
        configurable: true
    });
    Map.prototype.createMap = function () {
        this.init();
        var initialRoom = false;
        while (!initialRoom) {
            initialRoom = this.makeRoom(this._w / 2, this._l / 2, this.randomDirection());
        }
        var roomCount = 1;
        for (var tries = 0; tries < 1000; tries++) {
            if (roomCount === this._roomAmount) {
                break;
            }
            /* Initialization of new room vars */
            var x = 0;
            var xmd = 0;
            var y = 0;
            var ymd = 0;
        }
    };
    /**
    * @function
    * @desc Initiates the map array. Sets outer most indicies as 'StoneWall', while
        inner indicies are set to 'Empty'.
    */
    Map.prototype.init = function () {
        for (var y = 0, x = 0; y < this._l; y++) {
            for (x = 0; x < this._w; x++) {
                (y === 0 || y === this._l - 1 || x === 0 || x === this._w - 1) ?
                    this._map[x + this._w * y] = tile_1.Tile.StoneWall :
                    this._map[x + this._w * y] = tile_1.Tile.Empty;
            }
        }
    };
    /**
    * @function
    * @param {number} x
    * @param {number} y
    * @param {Direction} dir
    * @returns {boolean}
    * @desc Creates a room, then applies the generated room.room to the _map
        array.
    */
    Map.prototype.makeRoom = function (x, y, dir) {
        var width = this._random.nextInt32([4, 10]);
        var length = this._random.nextInt32([4, 10]);
        var floor = tile_1.Tile.DirtFloor;
        var Wall = tile_1.Tile.DirtWall;
        var room = new Room_1.Room(x, y, width, length, dir);
        /**
        * Checks to see if any of the indicies are outside the bounds of the
            room, or if the index Tile type isn't 'Empty'
        * @todo implement a more efficient approach
        */
        room.room.some(function (val) {
            if (val.y < 0 || val.y > this._w || val.x < 0 || val.x > this._l || (this._map[val.x + this._w * val.y]) !== tile_1.Tile.Empty) {
                return false;
            }
        });
        /**
        * Sets each index of Room._map to either a DirtWall or a DirtFloor
        * @todo modify functionality to access more Tile types
        */
        for (var i = 0; i < room.room.length; i++) {
            var pos = room.room[i].x + this._w * room.room[i].y;
            this._map[pos] = this.isWall(x, y, this._w, this._l, room.room[i].x, room.room[i].y, dir) ? tile_1.Tile.DirtWall : tile_1.Tile.DirtFloor;
        }
        return true;
    };
    /**
    * @function
    * @param {number} x
    * @param {number} y
    * @param {number} width
    * @param {number} length
    * @param {number} xpos
    * @param {number} ypos
    * @param {Direction} dir
    * @returns {boolean}
    * @desc Checks to see if a specific index in a Room.room array is a Wall
    */
    Map.prototype.isWall = function (x, y, width, length, xpos, ypos, dir) {
        /* For each case, check if index lies on the bounds of the room
            (bounds are different for each case) */
        switch (dir) {
            case direction_1.Direction.North:
                return xpos === (x - width / 2) || xpos === (x + (width - 1) / 2) || ypos === y || ypos === y - length + 1;
            case direction_1.Direction.East:
                return xpos === x || xpos === x + width - 1 || ypos === (y - width / 2) || ypos === (y + (width - 1) / 2);
            case direction_1.Direction.South:
                return xpos === (x - width / 2) || xpos === (x + (width - 1) / 2) || ypos === y || ypos === y + length - 1;
            case direction_1.Direction.West:
                return xpos === x || xpos === x - width + 1 || ypos === (y - width / 2) || ypos === (y + (width - 1) / 2);
        }
    };
    /**
    * @function
    * @returns {Direction}
    * @desc Returns a 'random' Direction from the four cardinal directions
    */
    Map.prototype.randomDirection = function () {
        var r = this._random.nextInt32([0, 4]);
        switch (r) {
            case 0:
                return direction_1.Direction.North;
            case 1:
                return direction_1.Direction.East;
            case 2:
                return direction_1.Direction.South;
            case 3:
                return direction_1.Direction.West;
        }
    };
    return Map;
}());
