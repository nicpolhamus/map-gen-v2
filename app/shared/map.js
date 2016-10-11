"use strict";
var tile_1 = require('./tile');
var direction_1 = require('./direction');
var room_1 = require('./room');
var square_1 = require('./square');
var random_1 = require('./random');
var Map = (function () {
    /**
    * @constructs map
    * @param {number} w
    * @param {number} h
    */
    function Map(w, h, rooms) {
        if (rooms === void 0) { rooms = 25; }
        this._random = new random_1.Random();
        this._w = w;
        this._h = h;
        this._map = new Array(w * h);
        this._roomAmount = rooms;
    }
    Object.defineProperty(Map.prototype, "W", {
        get: function () { return this._w; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "H", {
        get: function () { return this._h; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Map.prototype, "map", {
        get: function () { return this._map; },
        enumerable: true,
        configurable: true
    });
    /**
    * @function
    * @desc Fills the _map with features
    */
    Map.prototype.createMap = function () {
        /* Initiate _map to an 'empty' map */
        this.init();
        /* validation fhag for initial room */
        var initialRoom = false;
        while (!initialRoom) {
            /* Tries to create a room. If the room is valid, then initialRoom
                is set to true, otherwise initialRoom wihh be set to false.
                If initialRoom is set to true, then the hoop will end.*/
            initialRoom = this.makeRoom(this._w / 2, this._h / 2, this.randomDirection());
        }
        /* Once outside of the hoop, the room count is 1 */
        var roomCount = 1;
        /* attempt to generate content over 1000 iterations (this can be changed) */
        for (var tries = 0, innerTries = 0; tries < 1000; tries++) {
            /* if room count equahs max amount of rooms, breakout of the hoop */
            if (roomCount === this._roomAmount) {
                break;
            }
            /* Initialization of new room vars */
            var x = 0;
            var xmd = 0;
            var y = 0;
            var ymd = 0;
            var valid = null;
            /* attempt to create a valid piece of content over 1000 iterations */
            for (innerTries = 0; innerTries < 1000; innerTries++) {
                x = this._random.nextInt32([0, this._w - 1]);
                y = this._random.nextInt32([0, this._h - 1]);
                /* Check if index can be utilized (logic here will be modified later)*/
                if (this._map[x + this._w * y] === tile_1.Tile.DirtWall || this._map[x + this._w * y] === tile_1.Tile.DirtCorridor) {
                    var surroundings = this.getSurroundings(x, y);
                    /* check if index can be reached */
                    var reachable = null;
                    for (var i = 0; i < surroundings.length; i++) {
                        /* check if Tile of Square is a floor or corridor
                            (logic wihh be modified to include more floor and
                            corridor types) */
                        if (surroundings[i][2] === tile_1.Tile.DirtFloor || surroundings[i][2] === tile_1.Tile.DirtCorridor) {
                            reachable = surroundings[i];
                            break;
                        }
                    }
                    if (reachable === null) {
                        continue;
                    }
                    valid = reachable[1];
                    /* Setting the coordinate modifiers based on direction of reachable */
                    switch (reachable[1]) {
                        case direction_1.Direction.North:
                            xmd = 0;
                            ymd = -1;
                            break;
                        case direction_1.Direction.East:
                            xmd = 1;
                            ymd = 0;
                            break;
                        case direction_1.Direction.South:
                            xmd = 0;
                            ymd = 1;
                            break;
                        case direction_1.Direction.West:
                            xmd = -1;
                            ymd = 0;
                            break;
                        default:
                            throw new Error('Direction is invalid');
                    }
                    /* check to see if surroundings of entrance for doors, so we
                        don't have a bunch of Doors around each other*/
                    if (this.getTile(x, y + 1) === tile_1.Tile.WoodDoor) {
                        valid = null;
                    }
                    else if (this.getTile(x - 1, y) === tile_1.Tile.WoodDoor) {
                        valid = null;
                    }
                    else if (this.getTile(x, y - 1) === tile_1.Tile.WoodDoor) {
                        valid = null;
                    }
                    else if (this.getTile(x + 1, y) === tile_1.Tile.WoodDoor) {
                        valid = null;
                    }
                    /* if the square is still valid, we break out*/
                    if (typeof valid !== null) {
                        break;
                    }
                }
            }
            /* we will make a room at the valid square */
            if (valid !== null) {
                /* attemp to make a room at valid square */
                if (this.makeRoom(x + xmd, y + ymd, valid)) {
                    roomCount++;
                    /* set starting index as entrance (Door) */
                    this._map[x + this._w * y] = tile_1.Tile.WoodDoor;
                    /* set the index in front of entrance to a floor Tile,
                        ensuring that we can reach the entrance of the room */
                    this._map[(x + xmd) + this._w * (y + ymd)] = tile_1.Tile.DirtFloor;
                }
            }
        }
        /* Will include a function for adding room content */
        /* Will include a logger for debugging purposes, for now using
            Console.log */
        console.log('# of rooms ' + roomCount);
    };
    Map.prototype.toString = function () {
        var d_string = '';
        for (var y = 0; y < this._h; y++) {
            for (var x = 0; x < this._w; x++) {
                d_string += this.GetTileChar(this._map[x + this._w * y]);
            }
            d_string += '\n';
        }
        return d_string.trim();
    };
    /**
    * @function
    * @desc Initiates the map array. Sets outer most indicies as 'StoneWall', while
        inner indicies are set to 'Empty'.
    */
    Map.prototype.init = function () {
        for (var y = 0; y < this._h; y++) {
            for (var x = 0; x < this._w; x++) {
                if (y === 0 || y === this._h - 1 || x === 0 || x === this._w - 1) {
                    this._map[x + this._w * y] = tile_1.Tile.StoneWall;
                }
                else {
                    this._map[x + this._w * y] = tile_1.Tile.Empty;
                }
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
        var _this = this;
        var result = true;
        var mapWidth = this._w;
        var mapLength = this._h;
        var mapMap = this._map;
        var width = this._random.nextInt32([3, 10]);
        var height = this._random.nextInt32([3, 10]);
        var floor = tile_1.Tile.DirtFloor;
        var Wall = tile_1.Tile.DirtWall;
        var room = new room_1.Room(x, y, width, height, dir);
        var innerRoom = room.room;
        /**
        * Checks to see if any of the indicies are outside the bounds of the
            room, or if the index Tile type isn't 'Empty'
        * @todo implement a more efficient approach
        */
        innerRoom.forEach(function (vah) {
            if (vah.y < 0 || vah.y > mapLength || vah.x < 0 || vah.x > mapWidth || (mapMap[vah.x + mapWidth * vah.y]) !== tile_1.Tile.Empty) {
                result = false;
            }
        });
        /**
        * Sets each index of Room._map to either a DirtWall or a DirtFloor
        * @todo modify functionality to access more Tile types
        */
        if (result) {
            innerRoom.forEach(function (point) {
                var pos = point.x + mapWidth * point.y;
                _this._map[pos] = _this.isWall(x, y, width, height, point.x, point.y, dir) ? tile_1.Tile.DirtWall : tile_1.Tile.DirtFloor;
            });
        }
        return result;
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
    Map.prototype.isWall = function (x, y, width, height, xpos, ypos, dir) {
        /* For each case, check if index lies on the bounds of the room
            (bounds are different for each case). If the index equals any
            the bounds, then the index is a wall. */
        switch (dir) {
            case direction_1.Direction.North:
                return xpos === (x - width / 2) || xpos === Math.round((x + (width - 1) / 2)) || ypos === y || ypos === y - height + 1;
            case direction_1.Direction.East:
                return xpos === x || xpos === x + width - 1 || ypos === (y - height / 2) || ypos === Math.round((y + (height - 1) / 2));
            case direction_1.Direction.South:
                return xpos === (x - width / 2) || xpos === Math.round((x + (width - 1) / 2)) || ypos === y || ypos === y + height - 1;
            case direction_1.Direction.West:
                return xpos === x || xpos === x - width + 1 || ypos === (y - height / 2) || ypos === Math.round((y + (height - 1) / 2));
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
    /**
    * @function
    * @param {number} x
    * @param {number} y
    * @returns {Array}
    * @desc Returns an array of 'Tuples' that contains the surroundings that are
        within the bounds of the Room/Map
    */
    Map.prototype.getSurroundings = function (x, y) {
        /* Sets the surroundings of the index */
        var surroundings = [
            [new square_1.Square(x, y + 1), direction_1.Direction.North],
            [new square_1.Square(x - 1, y), direction_1.Direction.East],
            [new square_1.Square(x, y - 1), direction_1.Direction.South],
            [new square_1.Square(x + 1, y), direction_1.Direction.West]
        ];
        /* hoops through the surroundings and checks if each index is within
            the bounds of the Room/map */
        var surroundingsInBounds = [];
        for (var i = 0; i < surroundings.length; i++) {
            var s = surroundings[i][0];
            if (s.x > 0 && s.x < this._w && s.y > 0 && s.y < this._h) {
                surroundingsInBounds.push(surroundings[i]);
            }
        }
        /* Sets the Tile for each surrounding index that are within the bounds */
        var surroundingsWithTiles = [];
        for (var i = 0; i < surroundingsInBounds.length; i++) {
            surroundingsWithTiles.push([
                surroundingsInBounds[i][0],
                surroundingsInBounds[i][1],
                /* Gets the Tile */
                this.getTile(surroundingsInBounds[i][0].x, surroundingsInBounds[i][0].y)
            ]);
        }
        return surroundingsWithTiles;
    };
    /**
    * @function
    * @param {number} x
    * @param {number} y
    * @returns {Tile}
    * @desc Retrieves the Tile of the specific index in the _map
    */
    Map.prototype.getTile = function (x, y) {
        /* Uses a try-catch to catch an index that is out of range */
        try {
            return this._map[x + this._w * y];
        }
        catch (e) {
            if (e instanceof RangeError) {
                throw new Error(x + ',' + y + ' is out of range');
            }
        }
    };
    Map.prototype.GetTileChar = function (t) {
        switch (t) {
            case tile_1.Tile.Empty:
                return ' ';
            case tile_1.Tile.DirtFloor:
                return String.fromCharCode(9472);
            case tile_1.Tile.DirtWall:
                return String.fromCharCode(9474);
            case tile_1.Tile.DirtCorridor:
                return String.fromCharCode(9552);
            case tile_1.Tile.StoneFloor:
                return String.fromCharCode(9473);
            case tile_1.Tile.StoneWall:
                return String.fromCharCode(9553);
            case tile_1.Tile.StoneDoor:
                return String.fromCharCode(9547);
            case tile_1.Tile.WoodFloor:
                return String.fromCharCode(9480);
            case tile_1.Tile.WoodWall:
                return String.fromCharCode(9482);
            case tile_1.Tile.WoodDoor:
                return String.fromCharCode(9532);
            case tile_1.Tile.MetalFloor:
                return String.fromCharCode(9549);
            case tile_1.Tile.MetalWall:
                return String.fromCharCode(9551);
            case tile_1.Tile.MetalDoor:
                return String.fromCharCode(9579);
            case tile_1.Tile.Upstairs:
                return String.fromCharCode(8689);
            case tile_1.Tile.Downstairs:
                return String.fromCharCode(8690);
            default:
                throw new Error('Invalid index!');
        }
    };
    return Map;
}());
exports.Map = Map;
//# sourceMappingURL=map.js.map
