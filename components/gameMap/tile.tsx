import "@/styles/gameMap/map-style.css";
import "@/styles/global/global.css";
import {MapCoordinates, MapTileData, TileEdge} from "../../types/mapTypes";
import Image from "next/image";
import {NONE} from "../../types/buildingTypes";
import {GameEvent} from "../../types/eventTypes";

interface Props {
    tileData: MapTileData,
    edge?: TileEdge,
    setMarkedTile: (coordinates: MapCoordinates) => void,
    isMarked: boolean,
    tileEvents: GameEvent[],
    setMouseOverTile: (coordinates: MapCoordinates) => void,
}

const Tile = ({ tileData, edge = TileEdge.NONE , setMarkedTile, isMarked, setMouseOverTile, tileEvents}: Props) => {

    const tileContent = () => {
        if (!tileData.visible) {
            return (<Image src={`/media/images/tile/fog.png`} className={"img"}
                           alt={"fog"} height={70} width={60}></Image>)
        }

        // add if statement for unit prioritized over building

        const buildingComplete = tileData.building.type.completeAtProgress <= tileData.building.progress

        if (tileData.building.type !== NONE && buildingComplete)  {
            return (<Image src={tileData.building.type.img} className={"img"}
                           alt={tileData.building.type.name} height={30} width={30}></Image>)
        }

        if (tileData.building.progress > 0) {
            return (<Image src={`/media/images/buildings/construction.png`} className={"img"}
                           alt={tileData.building.type.name} height={30} width={30}></Image>)
        }
    }

    const tileStyle = () => {
        if (isMarked) {
            return {backgroundColor: 'rgba(0, 0, 0)'}
        }
        if (tileEvents.length > 0) {
            const backgroundColor = 'rgba(0, 0, 0)';
            const linearGradientColor = `repeating-conic-gradient(
                ${tileData.tileOwner.hexCode} 0deg,
                ${tileData.tileOwner.hexCode} 30deg,
                ${backgroundColor} 30deg,
                ${backgroundColor} 90deg,
                ${tileData.tileOwner.hexCode} 90deg,
                ${tileData.tileOwner.hexCode} 120deg)`;

            return {backgroundImage: linearGradientColor, backgroundSize: 'cover' };
        }
        return {backgroundColor: tileData.tileOwner.hexCode}
    }

    return (
        <div onMouseOver={() => setMouseOverTile(tileData.coordinates)} onClick={() => setMarkedTile(tileData.coordinates)} className={`border ${edge}`} style={tileStyle()}>
            <div className={`tile ${tileData.tileTerrainValue.css} ${edge}`}>{tileContent()}</div>
        </div>
    )
}

export default Tile