import "@/styles/ui-style.css";
import Image from "next/image";
import {Resource} from "../../types/manaTypes";


interface Props {
    resource: Resource
    size: number
}
const ResourceIcon = ({resource, size} : Props) => {

    return (
        <div className={"resourceIcon"}>
            <Image src={`/media/images/resources/${resource}.png`} alt={`Icon of ${resource}`} width={size} height={size} />
        </div>
    )
}
export default ResourceIcon