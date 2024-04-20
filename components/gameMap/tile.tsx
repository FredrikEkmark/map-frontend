import "@/styles/map-style.css";

import {MapCoordinates, MapTileData, TileEdge} from "../../types/mapTypes";
import Image from "next/image";
import {NONE} from "../../types/buildingTypes";

interface Props {
    tileData: MapTileData,
    edge?: TileEdge,
    setMarkedTile: (coordinates: MapCoordinates) => void,
    isMarked: boolean;
}

const Tile = ({ tileData, edge = TileEdge.NONE , setMarkedTile, isMarked}: Props) => {

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
            <div className={`tile ${tileData.tileTerrainValue.css} ${edge}`}>{tileContent()}</div>
        </div>
    )
}

export default Tile