import "@/styles/ui-style.css";
import ResourceIcon from "./resourceIcon";
import {Resource} from "../../types/manaTypes";

interface Props {
    resource: Resource
    amount: number,
}
const ResourceInfo = ({resource, amount} : Props) => {

    return (
        <div className={"resourceInfo"}>
            <ResourceIcon size={20} resource={resource}></ResourceIcon>
            <div className={"resourceAmount"}>{amount}</div>
        </div>
    )
}
export default ResourceInfo