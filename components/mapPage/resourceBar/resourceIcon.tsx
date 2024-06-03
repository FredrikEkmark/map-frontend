import "@/styles/resourceBar/resourceBar.css";
import "@/styles/global/global.css";
import Image from "next/image";
import {ResourceInfoType} from "../../../types/manaTypes";



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