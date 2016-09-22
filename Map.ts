import { Tile } from './tile';
import { Direction } from './direction';
import { Room } from './Room';
import { Square } from './square';
import { Random } from './random';

class Map {
    /** @prop {number} _w @desc width of the map */
    private _w: number;
    get W() { return this._w; }
    /** @prop {number} _l @desc length of the map */
    private _l: number;
    get L() { return this._l; }
    /** @prop {Array} _map @desc array of Tiles used as the map */
    private _map: Tile[];
    get map() { return this._map; }
    /** @member {Number} @desc room percentage, SUBJECT TO CHANGE */
    private _roomAmount: number = 25;
    private _random: Random = new Random();
    private _console: Console = new Console();
    /**
    * @constructs map
    * @param {number} w
    * @param {number} l
    */
    constructor(w: number, l: number) {
        this._w = w;
        this._l = l;
        this._map = [w * l];
    }
    /**
    * @function
    * @desc Fills the _map with features
    */
    createMap() {
        /* Initiate _map to an 'empty' map */
        this.init();
        /* validation flag for initial room */
        let initialRoom: boolean = false;
        while (!initialRoom) {
            /* Tries to create a room. If the room is valid, then initialRoom
                is set to true, otherwise initialRoom will be set to false.
                If initialRoom is set to true, then the loop will end.*/
            initialRoom = this.makeRoom(this._w / 2, this._l / 2, this.randomDirection());
        }
        /* Once outside of the loop, the room count is 1 */
        let roomCount = 1;
        /* attempt to generate content over 1000 iterations (this can be changed) */
        for (let tries = 0, innerTries = 0; tries < 1000; tries++) {
            /* if room count equals max amount of rooms, breakout of the loop */
            if (roomCount === this._roomAmount) { break; }

            /* Initialization of new room vars */
            let x: number = 0;
            let xmd: number = 0;
            let y: number = 0;
            let ymd: number = 0;
            let valid: Direction = null;
            /* attempt to create a valid piece of content over 1000 iterations */
            for (innerTries = 0; innerTries < 1000; innerTries++) {
                x = this._random.nextInt32([0,100]);
                y = this._random.nextInt32([0,100]);
                /* Check if index can be utilized (logic here will be modified later)*/
                if (this._map[x+this._w*y] === Tile.DirtWall || this._map[x+this._w*y] === Tile.DirtCorridor) {
                    let surroundings: [Square, Direction, Tile][] = this.getSurroundings(x,y);

                    /* check if index can be reached */
                    let reachable: [Square, Direction, Tile] = null;
                    for (let i = 0; i < surroundings.length; i++) {
                        /* check if Tile of Square is a floor or corridor
                            (logic will be modified to include more floor and
                            corridor types) */
                        if (surroundings[i][2] === Tile.DirtFloor || surroundings[i][2] === Tile.DirtCorridor) {
                            reachable = surroundings[i];
                            break;
                        }
                    }
                    valid = reachable[1];
                    /* Setting the coordinate modifiers based on direction of reachable */
                    switch (reachable[1]) {
                        case Direction.North:
                            xmd = 0;
                            ymd = -1;
                            break;
                        case Direction.East:
                            xmd = 1;
                            ymd = 0;
                            break;
                        case Direction.South:
                            xmd = 0;
                            ymd = 1;
                            break;
                        case Direction.West:
                            xmd = -1;
                            ymd = 0;
                            break;
                        default:
                            throw new Error('Direction is invalid');
                    }
                    /* check to see if surroundings of entrance for doors, so we
                        don't have a bunch of Doors around each other*/
                    if (this.getTile(x,y+1) === Tile.WoodDoor) { //North check
                        valid = null;
                    } else if (this.getTile(x-1,y) === Tile.WoodDoor) { //East check
                        valid = null;
                    } else if (this.getTile(x,y-1) === Tile.WoodDoor) { //South check
                        valid = null;
                    } else if (this.getTile(x+1,y) === Tile.WoodDoor) { //West Check
                        valid = null;
                    }
                    /* if the square is still valid, we break out*/
                    if (typeof valid !== null) { break; }
                }
                /* we will make a room at the valid square */
                if (typeof valid !== null) {
                    /* attemp to make a room at valid square */
                    if (this.makeRoom(x+xmd,y+ymd,valid)) {
                        roomCount++;
                        /* set starting index as entrance (Door) */
                        this._map[x+this._w*y] = Tile.WoodDoor;
                        /* set the index in front of entrance to a floor tile,
                            ensuring that we can reach the entrance of the room */
                        this._map[(x+xmd)+this._w*(y+ymd)] = Tile.DirtFloor;
                    }
                }
            }

            /* Will include a function for adding room content */
            /* Will include a logger for debugging purposes, for now using
                Console.log */
            this._console.log('# of rooms '+roomCount);
        }
    }
    /**
    * @function
    * @desc Initiates the map array. Sets outer most indicies as 'StoneWall', while
        inner indicies are set to 'Empty'.
    */
    private init() {
        for (let y = 0, x = 0; y < this._l; y++) {
            for (x = 0; x < this._w; x++) {
                (y === 0 || y === this._l - 1 || x === 0 || x === this._w - 1) ?
                    this._map[x + this._w * y] = Tile.StoneWall :
                    this._map[x + this._w * y] = Tile.Empty;
            }
        }
    }
    /**
    * @function
    * @param {number} x
    * @param {number} y
    * @param {Direction} dir
    * @returns {boolean}
    * @desc Creates a room, then applies the generated room.room to the _map
        array.
    */
    private makeRoom(x: number, y: number, dir: Direction): boolean {
        let width: number = this._random.nextInt32([3, 10]);
        let length: number = this._random.nextInt32([3, 10]);

        const floor: number = Tile.DirtFloor;
        const Wall = Tile.DirtWall;

        let room: Room = new Room(x, y, width, length, dir);

        /**
        * Checks to see if any of the indicies are outside the bounds of the
            room, or if the index Tile type isn't 'Empty'
        * @todo implement a more efficient approach
        */
        room.room.some(function(val) {
            if (val.y < 0 || val.y > this._w || val.x < 0 || val.x > this._l || (this._map[val.x + this._w * val.y]) !== Tile.Empty) {
                return false;
            }
        });

        /**
        * Sets each index of Room._map to either a DirtWall or a DirtFloor
        * @todo modify functionality to access more Tile types
        */
        for (let i = 0; i < room.room.length; i++) {
            let pos = room.room[i].x + this._w * room.room[i].y;
            this._map[pos] = this.isWall(x, y, this._w, this._l, room.room[i].x, room.room[i].y, dir) ? Tile.DirtWall : Tile.DirtFloor;
        }
        return true;
    }
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
    private isWall(x: number, y: number, width: number, length: number, xpos: number, ypos: number, dir: Direction): boolean {
        /* For each case, check if index lies on the bounds of the room
            (bounds are different for each case). If the index equals any
            the bounds, then the index is a wall. */
        switch (dir) {
            case Direction.North:
                return xpos === (x - width / 2) || xpos === (x + (width - 1) / 2) || ypos === y || ypos === y - length + 1;
            case Direction.East:
                return xpos === x || xpos === x + width - 1 || ypos === (y - width / 2) || ypos === (y + (width - 1) / 2);
            case Direction.South:
                return xpos === (x - width / 2) || xpos === (x + (width - 1) / 2) || ypos === y || ypos === y + length - 1;
            case Direction.West:
                return xpos === x || xpos === x - width + 1 || ypos === (y - width / 2) || ypos === (y + (width - 1) / 2);
        }
    }
    /**
    * @function
    * @returns {Direction}
    * @desc Returns a 'random' Direction from the four cardinal directions
    */
    private randomDirection(): Direction {
        let r: number = this._random.nextInt32([0, 4]);
        switch (r) {
            case 0:
                return Direction.North;
            case 1:
                return Direction.East;
            case 2:
                return Direction.South;
            case 3:
                return Direction.West;
        }
    }
    /**
    * @function
    * @param {number} x
    * @param {number} y
    * @returns {Array}
    * @desc Returns an array of 'Tuples' that contains the surroundings that are
        within the bounds of the Room/Map
    */
    private getSurroundings(x: number, y: number): [Square,Direction,Tile][] {
        /* Sets the surroundings of the index */
        let surroundings: [Square, Direction][] = [
            [new Square(x,y+1),Direction.North],
            [new Square(x-1,y),Direction.East],
            [new Square(x,y-1),Direction.South],
            [new Square(x+1,y),Direction.West]
        ];
        /* Loops through the surroundings and checks if each index is within
            the bounds of the Room/map */
        let surroundingsInBounds: [Square,Direction][] = [];
        for (let i = 0; i < surroundings.length; i++) {
            let s: Square = surroundings[i][0];
            if (s.x > 0 && s.x < this._w && s.y > 0 && s.y < this._l) {
                surroundingsInBounds.push(surroundings[i]);
            }
        }
        /* Sets the Tile for each surrounding index that are within the bounds */
        let surroundingsWithTiles: [Square,Direction,Tile][] = [];
        for (let i = 0; i < surroundingsInBounds.length; i++) {
            surroundingsWithTiles.push([
                surroundingsInBounds[i][0],
                surroundingsInBounds[i][1],
                /* Gets the Tile */
                this.getTile(surroundingsInBounds[i][0].x,surroundingsInBounds[i][0].y)
            ]);
        }
        return surroundingsWithTiles;
    }
    /**
    * @function
    * @param {number} x
    * @param {number} y
    * @returns {Tile}
    * @desc Retrieves the Tile of the specific index in the _map
    */
    private getTile(x: number, y: number): Tile {
        /* Uses a try-catch to catch an index that is out of range */
        try {
            return this._map[x+this._w*y];
        } catch (e) {
            if (e instanceof RangeError) {
                throw new Error(x+','+y+' is out of range');
            }
        }
    }
}
