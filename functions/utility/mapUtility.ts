import {MapCoordinates, MapTileData} from "../../types/playerViewTypes";

export function findTileInMap(mapCoordinates: MapCoordinates, map: MapTileData[]) {
    return map.find(tile => {
        return tile.coordinates.x === mapCoordinates.x && tile.coordinates.y === mapCoordinates.y;
    });
}