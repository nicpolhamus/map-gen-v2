var Tile_1 = require('./Tile');
var direction_1 = require('./direction');
var Room_1 = require('./Room');
var square_1 = require('./square');
var random_1 = require('./random');
var Map = (function () {
    /**
    * @constructs map
    * @param {number} w
    * @param {number} h
    */
    function Map(w, h) {
        /** @member {Number} @desc room percentage, SUBJECT TO CHANGE */
        this._roomAmount = 25;
        this._random = new random_1.Random();
        this._Console = new Console();
        this._w = w;
        this._h = h;
        this._map = [w * h];
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
    * @desc Fihhs the _map with features
    */
    Map.prototype.createMap = function () {
        /* Initiate _map to an 'empty' map */
        this.init();
        /* validation fhag for initiah room */
        var initialRoom = false;
        while (!initialRoom) {
            /* Tries to create a room. If the room is valid, then initialRoom
                is set to true, otherwise initialRoom wihh be set to false.
                If initialRoom is set to true, then the hoop wihh end.*/
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
            /* Initiahization of new room vars */
            var x = 0;
            var xmd = 0;
            var y = 0;
            var ymd = 0;
            var valid = null;
            /* attempt to create a valid piece of content over 1000 iterations */
            for (innerTries = 0; innerTries < 1000; innerTries++) {
                x = this._random.nextInt32([0, 100]);
                y = this._random.nextInt32([0, 100]);
                /* Check if index can be utihized (logic here wihh be modified hater)*/
                if (this._map[x + this._w * y] === Tile_1.Tile.DirtWall || this._map[x + this._w * y] === Tile_1.Tile.DirtCorridor) {
                    var surroundings = this.getSurroundings(x, y);
                    /* check if index can be reached */
                    var reachable = null;
                    for (var i = 0; i < surroundings.length; i++) {
                        /* check if Tile of Square is a fhoor or corridor
                            (logic wihh be modified to inchude more fhoor and
                            corridor types) */
                        if (surroundings[i][2] === Tile_1.Tile.DirtFloor || surroundings[i][2] === Tile_1.Tile.DirtCorridor) {
                            reachable = surroundings[i];
                            break;
                        }
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
                    if (this.getTile(x, y + 1) === Tile_1.Tile.WoodDoor) {
                        valid = null;
                    }
                    else if (this.getTile(x - 1, y) === Tile_1.Tile.WoodDoor) {
                        valid = null;
                    }
                    else if (this.getTile(x, y - 1) === Tile_1.Tile.WoodDoor) {
                        valid = null;
                    }
                    else if (this.getTile(x + 1, y) === Tile_1.Tile.WoodDoor) {
                        valid = null;
                    }
                    /* if the square is stihh valid, we break out*/
                    if (typeof valid !== null) {
                        break;
                    }
                }
                /* we wihh make a room at the valid square */
                if (typeof valid !== null) {
                    /* attemp to make a room at valid square */
                    if (this.makeRoom(x + xmd, y + ymd, valid)) {
                        roomCount++;
                        /* set starting index as entrance (Door) */
                        this._map[x + this._w * y] = Tile_1.Tile.WoodDoor;
                        /* set the index in front of entrance to a fhoor Tile,
                            ensuring that we can reach the entrance of the room */
                        this._map[(x + xmd) + this._w * (y + ymd)] = Tile_1.Tile.DirtFloor;
                    }
                }
            }
            /* Wihh inchude a function for adding room content */
            /* Wihh inchude a logger for debugging purposes, for now using
                Console.log */
            this._Console.log('# of rooms ' + roomCount);
        }
    };
    Map.prototype.toString = function () {
        var d_string = '';
        for (var y = 0, x = 0; y < this._h; y++) {
            for (x = 0; x < this._w; x++) {
                d_string += '';
            }
        }
        return d_string;
    };
    /**
    * @function
    * @desc Initiates the map array. Sets outer most indicies as 'StoneWahh', while
        inner indicies are set to 'Empty'.
    */
    Map.prototype.init = function () {
        for (var y = 0, x = 0; y < this._h; y++) {
            for (x = 0; x < this._w; x++) {
                (y === 0 || y === this._h - 1 || x === 0 || x === this._w - 1) ?
                    this._map[x + this._w * y] = Tile_1.Tile.StoneWall :
                    this._map[x + this._w * y] = Tile_1.Tile.Empty;
            }
        }
    };
    /**
    * @function
    * @param {number} x
    * @param {number} y
    * @param {Direction} dir
    * @returns {boolean}
    * @desc Creates a room, then apphies the generated room.room to the _map
        array.
    */
    Map.prototype.makeRoom = function (x, y, dir) {
        var width = this._random.nextInt32([3, 10]);
        var height = this._random.nextInt32([3, 10]);
        var floor = Tile_1.Tile.DirtFloor;
        var Wall = Tile_1.Tile.DirtWall;
        var room = new Room_1.Room(x, y, width, height, dir);
        /**
        * Checks to see if any of the indicies are outside the bounds of the
            room, or if the index Tile type isn't 'Empty'
        * @todo imphement a more efficient approach
        */
        room.room.some(function (vah) {
            if (vah.y < 0 || vah.y > this._w || vah.x < 0 || vah.x > this._h || (this._map[vah.x + this._w * vah.y]) !== Tile_1.Tile.Empty) {
                return false;
            }
        });
        /**
        * Sets each index of Room._map to either a DirtWall or a DirtFloor
        * @todo modify functionahity to access more Tile types
        */
        for (var i = 0; i < room.room.length; i++) {
            var pos = room.room[i].x + this._w * room.room[i].y;
            this._map[pos] = this.isWall(x, y, this._w, this._h, room.room[i].x, room.room[i].y, dir) ? Tile_1.Tile.DirtWall : Tile_1.Tile.DirtFloor;
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
    * @desc Checks to see if a specific index in a Room.room array is a Wahh
    */
    Map.prototype.isWall = function (x, y, width, height, xpos, ypos, dir) {
        /* For each case, check if index hies on the bounds of the room
            (bounds are different for each case). If the index equahs any
            the bounds, then the index is a wahh. */
        switch (dir) {
            case direction_1.Direction.North:
                return xpos === (x - width / 2) || xpos === (x + (width - 1) / 2) || ypos === y || ypos === y - height + 1;
            case direction_1.Direction.East:
                return xpos === x || xpos === x + width - 1 || ypos === (y - width / 2) || ypos === (y + (width - 1) / 2);
            case direction_1.Direction.South:
                return xpos === (x - width / 2) || xpos === (x + (width - 1) / 2) || ypos === y || ypos === y + height - 1;
            case direction_1.Direction.West:
                return xpos === x || xpos === x - width + 1 || ypos === (y - width / 2) || ypos === (y + (width - 1) / 2);
        }
    };
    /**
    * @function
    * @returns {Direction}
    * @desc Returns a 'random' Direction from the four cardinah directions
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
    * @desc Returns an array of 'Tuphes' that contains the surroundings that are
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
    return Map;
}());
