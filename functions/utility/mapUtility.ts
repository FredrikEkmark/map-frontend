import {GameMapData, MapCoordinates, MapTileData} from "../../types/mapTypes";
import {PlayerNumber} from "../../types/playerViewTypes";

export function findTileInMap(mapCoordinates: MapCoordinates, map: MapTileData[]) {
    return map.find(tile => {
        return tile.coordinates.x === mapCoordinates.x && tile.coordinates.y === mapCoordinates.y;
    });
}

export function numberOfPlayerOwnedTiles(gameMap: GameMapData, player: PlayerNumber): number {

    const ownedTiles = gameMap.map.filter(tile => tile.tileOwner === player);

    return ownedTiles.length;
}