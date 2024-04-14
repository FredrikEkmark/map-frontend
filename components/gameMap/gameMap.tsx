"use client" // toDo figure out if this should be modified

import "@/styles/map-style.css";
import {createElement, ReactElement, useEffect, useState} from "react";
import Tile from "./tile";
import MapBottomRow from "./mapBottomRow";
import {GameMapData, MapCoordinates, MapMove, MapTileData, TileEdge} from "../../types/mapTypes";
import {getPlayerNumberFromInput} from "../../types/playerViewTypes";

interface Props {
    startCoordinates: MapCoordinates
    mapData: GameMapData
    markedTile: MapCoordinates | null
    setMarkedTile: (coordinates: MapCoordinates) => void;
}

const GameMap = ({startCoordinates, mapData, markedTile, setMarkedTile}: Props) => {

    const [centerViewCoordinates, setCenterViewCoordinates] = useState({x: startCoordinates.x + (startCoordinates.x % 2), y:startCoordinates.y})

    const numRows = 13;
    const numCols = 15;

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

        const emptyTile = { coordinates: { x: x, y: y }, visible: false, tileTerrainValue: 0, tileOwner: getPlayerNumberFromInput("NONE") }

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
                setCenterViewCoordinates(prevState => ({ y: prevState.y, x: Math.max((numRows - 1) / 2, prevState.x - 2) }))
                break
            case MapMove.LEFT:
                setCenterViewCoordinates({y: (centerViewCoordinates.y - 2 + mapData.mapSize.width) % mapData.mapSize.width, x: centerViewCoordinates.x})
                break
            case MapMove.RIGHT:
                setCenterViewCoordinates({y: (centerViewCoordinates.y + 2) % mapData.mapSize.width, x: centerViewCoordinates.x})
                break
            case MapMove.DOWN:
                setCenterViewCoordinates(prevState => ({ y: prevState.y, x: Math.min(mapData.mapSize.height - ((numRows - 1) / 2) - 1, prevState.x + 2) }))
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
                    setMarkedTile: setMarkedTile,
                    isMarked: isMarkedTile(row, col),
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
            <MapBottomRow markedTile={markedTile} moveCenterViewPoint={moveCenterViewPoint}></MapBottomRow>
        </div>
        </main>
    );
}

export default GameMap