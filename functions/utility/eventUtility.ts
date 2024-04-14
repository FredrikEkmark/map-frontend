import {GameEvent} from "../../types/eventTypes";
import {MapCoordinates} from "../../types/mapTypes";


export function findEventInMap(mapCoordinates: MapCoordinates | null, map: GameEvent[]) {
    if (!mapCoordinates) {
        return undefined
    }
    return map.find(event => {
        return event.primaryTileCoordinates.x === mapCoordinates.x && event.primaryTileCoordinates.y === mapCoordinates.y;
    });
}