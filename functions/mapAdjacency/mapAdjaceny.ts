import {findTileInMap} from "../utility/mapUtility";
import {PlayerNumber} from "../../types/playerViewTypes";
import {MapCoordinates, MapTileData} from "../../types/mapTypes";

function getXOffset(tileDistance: number) {

    let xOffsets = []


        for (let i = 0; i < tileDistance + 1; i++) {
            const topRow = 2 + i

            let xOffset
            // topLine
            for (let j = 0; j < topRow; j++) {
                xOffset = -1 - i
                xOffsets.push(xOffset)
            }

            for (let j = 0; j < topRow-1; j++) {
                xOffset = j - i
                xOffsets.push(xOffset)
            }

            for (let j = 0; j < topRow-1; j++) {
                xOffset = j + 1
                xOffsets.push(xOffset)
            }

            for (let j = 0; j < topRow-1; j++) {
                xOffset = i + 1
                xOffsets.push(xOffset)
            }

            for (let j = 0; j < topRow-1; j++) {
                xOffset = i - j
                xOffsets.push(xOffset)
            }

            for (let j = 0; j < topRow - 2; j++) {
                xOffset = - 1 - j
                xOffsets.push(xOffset)
            }
        }

    return xOffsets
}

function getYOffset(xCoordinate: number, tileDistance: number) {

    const isEven = xCoordinate % 2 === 0

    let yOffsets = []

    if (isEven) {

        for (let i = 0; i < tileDistance + 1; i++) {
            const topRow = 2 + i

            let yOffset

            for (let j = 0; j < topRow; j++) {
                yOffset = - 1 - Math.floor(i / 2) + j
                yOffsets.push(yOffset)
            }

            for (let j = 0; j < topRow-1; j++) {
                let jValue = i % 2 === 0 ? Math.floor( j / 2) : Math.ceil( j / 2)
                yOffset = 1 + Math.floor(i / 2) + jValue
                yOffsets.push(yOffset)
            }

            for (let j = 0; j < topRow-1; j++) {
                yOffset =  i - Math.floor(j / 2)
                yOffsets.push(yOffset)
            }

            for (let j = 0; j < topRow-1; j++) {
                yOffset = - 1 + Math.ceil(i / 2) - j
                yOffsets.push(yOffset)
            }

            for (let j = 0; j < topRow-1; j++) {
                let jValue = i % 2 === 0 ? Math.ceil( j / 2) : Math.floor( j / 2)
                yOffset = -1 - Math.ceil(i / 2) - jValue
                yOffsets.push(yOffset)
            }

            for (let j = 0; j < topRow - 2; j++) {
                yOffset = - 1  - i + Math.ceil(j / 2)
                yOffsets.push(yOffset)
            }
        }

    } else {

        for (let i = 0; i < tileDistance + 1; i++) {
            const topRow = 2 + i

            let yOffset

            for (let j = 0; j < topRow; j++) {
                yOffset = - Math.ceil(i / 2) + j
                yOffsets.push(yOffset)
            }

            for (let j = 0; j < topRow-1; j++) {
                let jxValue = i % 2 === 0 ? Math.ceil( j / 2) : Math.floor( j / 2)
                yOffset = 1 + Math.ceil(i / 2) + jxValue
                yOffsets.push(yOffset)
            }

            for (let j = 0; j < topRow-1; j++) {
                yOffset = 1 + i - Math.ceil(j / 2)
                yOffsets.push(yOffset)
            }

            for (let j = 0; j < topRow-1; j++) {
                yOffset = Math.floor(i / 2) - j
                yOffsets.push(yOffset)
            }

            for (let j = 0; j < topRow-1; j++) {
                let jxValue = i % 2 === 0 ? Math.floor( j / 2) : Math.ceil( j / 2)
                yOffset = -1 - Math.floor(i / 2) - jxValue
                yOffsets.push(yOffset)
            }

            for (let j = 0; j < topRow - 2; j++) {
                yOffset = - i + Math.floor(j / 2)
                yOffsets.push(yOffset)
            }
        }
    }
    return yOffsets
}

function tilesInRange(tileDistance: number) {

    let counter = 0;

    for (let i = 0; i < tileDistance + 1; i++) {
        const topRow = 2 + i

        for (let j = 0; j < topRow; j++) {
            counter++
        }

        for (let j = 0; j < topRow-1; j++) {
            counter++
        }

        for (let j = 0; j < topRow-1; j++) {
            counter++
        }

        for (let j = 0; j < topRow-1; j++) {
            counter++
        }

        for (let j = 0; j < topRow-1; j++) {
            counter++
        }

        for (let j = 0; j < topRow - 2; j++) {
            counter++
        }
    }

    return counter
}

export function ownerIsAdjacent(owner: PlayerNumber, centerCoordinates: MapCoordinates, map: MapTileData[]): boolean {

    const tileDistance = 0

    const xOffset = getXOffset(tileDistance)
    const yOffset = getYOffset(centerCoordinates.x, tileDistance)

    for (let i = 0; i < xOffset.length; i++) {
        const coordinates = {
            x: xOffset[i] + centerCoordinates.x,
            y: yOffset[i] + centerCoordinates.y
        }
        const tile = findTileInMap(coordinates, map);

        if (tile?.tileOwner === owner) {
            return true
        }
    }

    return false;
}

export function visibleIsAdjacent(centerCoordinates: MapCoordinates, map: MapTileData[]): boolean {

    const tileDistance = 0

    const xOffset = getXOffset(tileDistance)
    const yOffset = getYOffset(centerCoordinates.x, tileDistance)

    for (let i = 0; i < xOffset.length; i++) {
        const coordinates = {
            x: xOffset[i] + centerCoordinates.x,
            y: yOffset[i] + centerCoordinates.y
        }
        const tile = findTileInMap(coordinates, map);

        if (tile?.visible) {
            return true
        }
    }

    return false;
}