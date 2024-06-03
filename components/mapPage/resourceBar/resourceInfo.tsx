import "@/styles/resourceBar/resourceBar.css";
import "@/styles/global/global.css";
import ResourceIcon from "./resourceIcon";
import {AlternativeResource, getResourceInfo, Resource} from "../../../types/manaTypes";
import Tooltip from "../global/tooltip";
import {ReactNode} from "react";
import Image from "next/image";

interface Props {
    resource: Resource,
    amount: number,
    secondaryResource?: AlternativeResource,
    secondaryAmount?: number,
}
const ResourceInfo = ({resource, amount, secondaryResource, secondaryAmount,} : Props) => {

    const addSecondaryResource = () => {
        if (secondaryResource && secondaryAmount) {
            return "/" + secondaryAmount
        }
    }

    const resourceInfo = getResourceInfo(resource)

    return (<Tooltip
            tooltipContent={resourceInfo.tooltipContent}>
        <div className={"resourceInfo"}>
            <ResourceIcon size={20} resourceInfo={resourceInfo}></ResourceIcon>
            <div className={"resourceAmount"}>{amount}{addSecondaryResource()}</div>
        </div></Tooltip>
    )
}
export default ResourceInfo