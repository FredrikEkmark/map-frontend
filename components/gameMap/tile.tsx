import "@/styles/map-style.css";
import {TileEdge} from "../../types/enums";
import {MapCoordinates, MapTileData} from "../../types/playerViewTypes";
import {useState} from "react";

interface Props {
    tileData: MapTileData,
    edge?: TileEdge,
    setMarkedTile: (coordinates: MapCoordinates) => void,
    isMarked: boolean;
}

const Tile = ({ tileData, edge = TileEdge.NONE , setMarkedTile, isMarked}: Props) => {

    const interpretTile = (value: number) => {

        if (!tileData.visible) {
            return "unexplored"
        }

        switch (value) {
            case 111: case 112: case 113: case 211: case 212: case 213: case 311: case 312: case 313: return "glacier";  // glacier
            case 123: case 133: case 143: case 153: return "deepWater"; // deepWater
            case 223: case 233: case 243: case 253: return "coastalWater";  // coastalWater
            case 322: case 323: return "lowlandTundra"; // lowlandTundra
            case 422: case 423: return "highlandsTundra"; // highlandsTundra
            case 321: return "coldDesert"; // coldDesert
            case 421: return "coldDesertHills"; // coldDesertHills
            case 331: return "temperateLowlandsPlains";  // temperateLowlandsPlains
            case 332: return "temperateForest";  // temperateForest
            case 431: return "highlandHills";  // highlandHills
            case 432: return "temperateHighlandForest";  // temperateHighlandForest
            case 333: return "temperateRainforest";  // temperateRainforest
            case 433: return "temperateHighlandRainforest";  // temperateHighlandRainforest
            case 341: return "hotDesert"; // hotDesert
            case 441: return "hotDesertHills"; // hotDesertHills 0x9c2e17
            case 342: return "hotSteppe"; // hotSteppe 0x459410
            case 442: return "hotSteppeHills"; // hotSteppeHills 0x69914e
            case 351: case 352: case 343: return "tropicalSavanna"; // tropicalSavanna 0x739410
            case 451: case 452: case 443: return "tropicalSavannaHills"; // tropicalSavannaHills 0x7e8f4c
            case 353: return "tropicalRainforest"; // tropicalRainforest 0x3f5209
            case 453: return "tropicalRainforestHills"; // tropicalRainforestHills 0x464f2b
            case 411: case 412: case 413: return "glacialHeights"; // glacialHeights 0x9dc6fc
            case 511: case 521: case 531: return "frozenMountains"; // frozenMountains 0xebf0f7
            case 541: case 551: return "mountains";  // mountains 0x260f02
            default:
                return "unexplored";
        }
    };

    const handleTileClick = () => {
        setMarkedTile(tileData.coordinates)
    };

    const userStyle = () => {
        if (isMarked) {
            return {backgroundColor: 'rgba(0, 0, 0)'}
        }
        return {backgroundColor: tileData.tileOwner.hexCode}
    }



    return (
        <div onClick={handleTileClick} className={`border ${edge}`} style={userStyle()}>
            <div className={`tile ${interpretTile(tileData.tileTerrainValue)} ${edge}`} ></div>
        </div>
    )
}

export default Tile