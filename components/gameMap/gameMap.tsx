import "@/styles/gameMap/map-style.css";
import "@/styles/global/global.css";
import {createElement, ReactElement, useEffect, useState} from "react";
import Tile from "./tile";
import MapBottomRow from "./mapBottomRow";
import {
    GameMapData,
    getTileTerrainValueFromInput,
    MapCoordinates,
    MapMove,
    MapTileData,
    TileEdge
} from "../../types/mapTypes";
import {getPlayerNumberFromInput} from "../../types/playerViewTypes";
import {BuildingTypes, getBuildingInfo} from "../../types/buildingTypes";
import {GameEvent} from "../../types/eventTypes";
import {findAllEventsInMap} from "../../functions/utility/eventUtility";

interface Props {
    centerViewCoordinates: MapCoordinates
    setCenterViewCoordinates: (coordinates: MapCoordinates) => void
    mapData: GameMapData
    markedTile: MapCoordinates | null
    setMarkedTile: (coordinates: MapCoordinates) => void;
    events: GameEvent[]
    requestingMoveCoordinates: boolean,
    setMoveCoordinates: (coordinates: MapCoordinates) => void,
}

const GameMap = ({centerViewCoordinates, setCenterViewCoordinates, mapData, markedTile, setMarkedTile, events, requestingMoveCoordinates, setMoveCoordinates}: Props) => {

    const [mouseOverTile, setMouseOverTile] = useState<MapCoordinates | null>(null)

    const numRows = 13;
    const numCols = 15;

    const setMarkedOrRequestedTile = (coordinates: MapCoordinates) => {
        console.log("Requested move " + requestingMoveCoordinates)
        if (requestingMoveCoordinates) {
            setMoveCoordinates(coordinates)
        } else {
            setMarkedTile(coordinates)
        }
    }

    const applyEdge = (row: number, col: number): TileEdge => {

        if (row === 0) {
            if (col === 0) {
                return TileEdge.LEFT_TOP
            } else if ( col === numCols - 1) {
                return TileEdge.RIGHT_TOP
            } else {
                return TileEdge.TOP
            }
        }

        if (row === numRows -1) {
            if (col === 0) {
                return TileEdge.LEFT_BOTTOM
            } else if ( col === numCols - 1) {
                return TileEdge.RIGHT_BOTTOM
            } else {
                return TileEdge.BOTTOM
            }
        }

        if (row % 2 === 0) {
            if (col === 0) {
                return TileEdge.LEFT
            } else if ( col === numCols - 1) {
                return TileEdge.RIGHT
            }
        }

        return TileEdge.NONE
    }

    const getTile = (row: number, col: number): MapTileData => {
        let y = (centerViewCoordinates.y - ((numCols - 1) / 2) + col) % mapData.mapSize.width;
        const x = centerViewCoordinates.x - ((numRows - 1) / 2) + row;

        if (y < 0) {
            y += mapData.mapSize.width;
        }

        const emptyTile = {
            coordinates: { x: x, y: y },
            visible: false,
            tileTerrainValue: getTileTerrainValueFromInput(0),
            tileOwner: getPlayerNumberFromInput("NONE"),
            building: {type: getBuildingInfo(BuildingTypes.NONE),
            progress: 0},
            army: null,
        }

        for (const tile of mapData.map) {
            if (tile.coordinates.x === x && tile.coordinates.y === y) {
                if (tile.visible) {
                    return tile; // Return the tile if coordinates match
                } else {
                    return emptyTile
                }
            }
        }
        return emptyTile;
    };

    const moveCenterViewPoint = (direction: MapMove) => {
        switch (direction.valueOf()) {
            case MapMove.UP:
                setCenterViewCoordinates({ y: centerViewCoordinates.y, x: Math.max((numRows - 1) / 2, centerViewCoordinates.x - 2) })
                break
            case MapMove.LEFT:
                setCenterViewCoordinates({y: (centerViewCoordinates.y - 2 + mapData.mapSize.width) % mapData.mapSize.width, x: centerViewCoordinates.x})
                break
            case MapMove.RIGHT:
                setCenterViewCoordinates({y: (centerViewCoordinates.y + 2) % mapData.mapSize.width, x: centerViewCoordinates.x})
                break
            case MapMove.DOWN:
                setCenterViewCoordinates({ y: centerViewCoordinates.y, x: Math.min(mapData.mapSize.height - ((numRows - 1) / 2) - 1, centerViewCoordinates.x + 2) })
                break
            default:
                console.log("Error, wrong input")
        }
    }

    const isMarkedTile = (row: number, col: number): boolean => {
        const y = (centerViewCoordinates.y - ((numCols - 1) / 2) + col) % mapData.mapSize.width;
        const x = centerViewCoordinates.x - ((numRows - 1) / 2) + row;

        if (markedTile?.y == y && markedTile.x == x) {
            return true
        }
        return false
    }

    const getEventsOnTile = (row: number, col: number) => {
        const y = (centerViewCoordinates.y - ((numCols - 1) / 2) + col) % mapData.mapSize.width;
        const x = centerViewCoordinates.x - ((numRows - 1) / 2) + row;

        const tileEvents = findAllEventsInMap({x: x, y: y}, events)

        return tileEvents
    }

    const renderMap = (): ReactElement[] => {
        const rows: ReactElement[] = [];

        for (let row = 0; row < numRows; row++) {
            const tiles: ReactElement[] = [];
            const numTiles = row % 2 === 0 ? numCols : numCols - 1;
            for (let col = 0; col < numTiles; col++) {
                const tileElement = createElement(Tile, {
                    key: col,
                    edge: applyEdge(row, col),
                    tileData: getTile(row, col),
                    setMarkedTile: setMarkedOrRequestedTile,
                    isMarked: isMarkedTile(row, col),
                    tileEvents: getEventsOnTile(row,col),
                    setMouseOverTile: setMouseOverTile,
                });
                tiles.push(tileElement);
            }
            const oddRowOffset = row % 2 !== 0 ? { marginLeft: "30px" } : {}; // Add marginLeft for odd rows
            const rowElement = createElement('div', { key: row, className: 'row', style: oddRowOffset }, tiles);
            rows.push(rowElement);
        }

        return rows;
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowUp':
                    moveCenterViewPoint(MapMove.UP);
                    break;
                case 'ArrowDown':
                    moveCenterViewPoint(MapMove.DOWN);
                    break;
                case 'ArrowLeft':
                    moveCenterViewPoint(MapMove.LEFT);
                    break;
                case 'ArrowRight':
                    moveCenterViewPoint(MapMove.RIGHT);
                    break;
                default:
                    break;
            }
        };

        // Add event listener when component mounts
        document.addEventListener('keydown', handleKeyDown);

        // Remove event listener when component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [moveCenterViewPoint]);

    return (
        <main>
        <div>
            <div className="container">
                {renderMap()}
            </div>
            <MapBottomRow mouseOverTile={mouseOverTile} moveCenterViewPoint={moveCenterViewPoint}></MapBottomRow>
        </div>
        </main>
    );
}

export default GameMap