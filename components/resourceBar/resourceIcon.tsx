import "@/styles/gameUi/gameUi.css";
import "@/styles/global/global.css";
import Image from "next/image";
import ResourceInfo from "./resourceInfo";
import {ResourceInfoType} from "../../types/manaTypes";



interface Props {
    resourceInfo: ResourceInfoType
    size: number
}
const ResourceIcon = ({resourceInfo, size} : Props) => {

    return (
        <div className={"resourceIcon"}>
            <Image src={resourceInfo.img} alt={`Icon of ${resourceInfo.name}`} width={size} height={size} />
        </div>
    )
}
export default ResourceIcon