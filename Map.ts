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
    /**
    * @constructs map
    * @param {number} w
    * @param {number} l
    */
    constructor(w: number, l: number) {
        this._w = w;
        this._l = l;
        this._map = [w*l];
    }

    createMap() {
        this.init();
        let initialRoom: boolean = false;
        while(!initialRoom) {
            initialRoom = this.makeRoom(this._w/2, this._l/2,this.randomDirection());
        }
        let roomCount = 1;
        for(let tries = 0; tries < 1000; tries++) {
            if (roomCount === this._roomAmount) { break; }

            /* Initialization of new room vars */
            let x: number = 0;
            let xmd: number = 0;
            let y: number = 0;
            let ymd: number = 0;

        }


    }
    /**
    * @function
    * @desc Initiates the map array. Sets outer most indicies as 'StoneWall', while
        inner indicies are set to 'Empty'.
    */
    private init() {
        for(let y = 0, x = 0; y < this._l; y++) {
            for(x = 0; x < this._w; x++) {
                (y === 0 || y === this._l-1 || x === 0 || x === this._w-1) ?
                    this._map[x+this._w*y] = Tile.StoneWall :
                    this._map[x+this._w*y] = Tile.Empty;
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
        let width: number = this._random.nextInt32([4,10]);
        let length: number = this._random.nextInt32([4,10]);

        const floor: number = Tile.DirtFloor;
        const Wall = Tile.DirtWall;

        let room: Room = new Room(x, y, width, length, dir);

        /**
        * Checks to see if any of the indicies are outside the bounds of the
            room, or if the index Tile type isn't 'Empty'
        * @todo implement a more efficient approach
        */
        room.room.some(function(val){
            if (val.y < 0 || val.y > this._w || val.x < 0 || val.x > this._l || (this._map[val.x+this._w*val.y]) !== Tile.Empty) {
                return false;
            }
        });

        /**
        * Sets each index of Room._map to either a DirtWall or a DirtFloor
        * @todo modify functionality to access more Tile types
        */
        for(let i = 0; i < room.room.length; i++) {
            let pos = room.room[i].x+this._w*room.room[i].y;
            this._map[pos] = this.isWall(x,y,this._w,this._l,room.room[i].x,room.room[i].y,dir) ? Tile.DirtWall : Tile.DirtFloor;
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
    private isWall(x: number, y: number, width: number, length: number,xpos: number, ypos: number, dir: Direction): boolean {
        /* For each case, check if index lies on the bounds of the room
            (bounds are different for each case) */
        switch (dir) {
            case Direction.North:
                return xpos === (x-width/2) || xpos === (x+(width-1)/2) || ypos === y || ypos === y-length+1;
            case Direction.East:
                return xpos === x || xpos === x+width-1 || ypos === (y-width/2) || ypos === (y+(width-1)/2);
            case Direction.South:
                return xpos === (x-width/2) || xpos === (x+(width-1)/2) || ypos === y || ypos === y+length-1;
            case Direction.West:
                return xpos === x || xpos === x-width+1 || ypos === (y-width/2) || ypos === (y+(width-1)/2);
        }
    }
    /**
    * @function
    * @returns {Direction}
    * @desc Returns a 'random' Direction from the four cardinal directions
    */
    private randomDirection(): Direction {
        let r: number = this._random.nextInt32([0,4]);
        switch(r) {
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
}
