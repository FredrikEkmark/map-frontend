import {GameEvent, GameEventType} from "../../types/eventTypes";
import {MapCoordinates} from "../../types/mapTypes";
import {getBuildingInfo} from "../../types/buildingTypes";

export function eventName(event: GameEvent)  {
    let building;
    if ('building' in event.eventData) {

        building = "Building " + getBuildingInfo(event.eventData.building).name;
    }
    switch (event.eventType) {
        case GameEventType.BUILD_EVENT: return building;
        case GameEventType.EXPLORE_EVENT: return "Exploring";
        case GameEventType.DEMOLISH_EVENT: return "Demolishing";
        case GameEventType.CLAIM_TILE_EVENT: return "Claiming Tile";
    }
}

export function findAllEventsInMap(mapCoordinates: MapCoordinates | null, map: GameEvent[]): GameEvent[] {
    if (!mapCoordinates) {
        return []
    }
    const array: GameEvent[] = []
    map.forEach(event => {
        if (event.primaryTileCoordinates.x === mapCoordinates.x && event.primaryTileCoordinates.y === mapCoordinates.y) {
            array.push(event);
        }
    })
    return array;
}