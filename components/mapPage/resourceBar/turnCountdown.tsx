import "@/styles/resourceBar/resourceBar.css";
import "@/styles/global/global.css";
import Image from "next/image";
import {ResourceInfoType} from "../../../types/manaTypes";
import {useEffect, useState} from "react";
import Tooltip from "../global/tooltip";



interface Props {
    turn: number
    turnChangeTime: Date
}
const TurnCountdown = ({turn, turnChangeTime} : Props) => {

    const calculateCountdown = (targetDate: Date): string => {
        const now = new Date();
        const diff = targetDate.getTime() - now.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        if (hours <= 0 && minutes <= 0 && seconds <= 0) {
            window.location.reload()
        }
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    }

    const padZero = (value: number): string  => {
        return value < 10 ? `0${value}` : `${value}`;
    }

    const [countdown, setCountdown] = useState(calculateCountdown(turnChangeTime));

    useEffect(() => {
        const timer = setInterval(() => {
            const newCountdown = calculateCountdown(turnChangeTime);
            setCountdown(newCountdown);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [turnChangeTime]);

    const tooltipContent = (
        <div className={"tooltipContent"} style={{width: '100px'}}>
            <p>Next Turn:</p>
            <div>
                <p>{turnChangeTime.toLocaleDateString()}</p>
                <p>{turnChangeTime.toLocaleTimeString()}</p>
            </div>
        </div>
    )

    return (
        <div>
            <Tooltip tooltipContent={tooltipContent}>Turn: {turn} Next Turn: {countdown}</Tooltip>
        </div>
    )
}
export default TurnCountdown