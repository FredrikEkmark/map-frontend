import React, {ReactNode, useState} from "react";


interface Props {
    children: ReactNode
    tooltipContent: ReactNode
    bottomDistance?: number

}
const Tooltip = ({children, tooltipContent, bottomDistance = 300} : Props) => {

    const [isVisible, setIsVisible] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const handleMouseOver = (event: React.MouseEvent<HTMLDivElement>) => {
        // toDO write in report about using chatGPT for this
        setIsVisible(true);
        const offsetX = 10; // Offset from cursor
        const offsetY = 10; // Offset from cursor
        const clientX = event.clientX;
        const clientY = event.clientY;

        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate distance from the tooltip position to the edges of the viewport
        const distanceToRightEdge = viewportWidth - clientX;
        const distanceToBottomEdge = viewportHeight - clientY;

        // Adjust tooltip position if too close to the right or bottom edge
        const adjustedX = distanceToRightEdge < 500 ? clientX - 250 : clientX + offsetX;
        const adjustedY = distanceToBottomEdge < 300 ? clientY - bottomDistance : clientY + offsetY;

        setTooltipPosition({ x: adjustedX, y: adjustedY });
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    return (
        <div
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}>
            {children}
            {isVisible ? (
                <div
                    style={{
                    position: 'absolute',
                    top: tooltipPosition.y,
                    left: tooltipPosition.x,
                    backgroundColor: '#f0f0f0',
                    padding: '10px',
                    border: '1px solid #ccc',
                    zIndex: 9999,
                    pointerEvents: 'none',
                }}>
                    {tooltipContent}
                </div>) : (<></>)}
        </div>
    )
}
export default Tooltip