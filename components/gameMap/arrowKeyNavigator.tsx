import "@/styles/map-style.css";
import {MapMove} from "../../types/enums";
import Image from "next/image";
import {useEffect, useState} from "react";

interface Props {
    moveCenterViewPoint: (direction: MapMove) => void;
}

type ArrowKey = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";

const ArrowKeyNavigator = ({moveCenterViewPoint} : Props) => {

    const [pressedKey, setPressedKey] = useState<ArrowKey | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                setPressedKey(event.key as ArrowKey);
            }
        };

        const handleKeyUp = () => {
            setPressedKey(null);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div className={"arrowKeyNavigator flex flex-col"}>
            <div className={"arrowButtonContainer flex flex-row w-full justify-center"}>
                <button style={{ transform: 'rotate(270deg)', backgroundColor: pressedKey === 'ArrowUp' ? 'gray' : 'white' }}
                        className={"arrowButton"}
                        onClick={() => moveCenterViewPoint(MapMove.UP)}>
                    <Image width={20} height={20} src={"/media/images/arrow.svg"} alt={""}/>
                </button>
            </div>
            <div className={"arrowButtonContainer"}>
                <button style={{ transform: 'rotate(180deg)', backgroundColor: pressedKey === 'ArrowLeft' ? 'gray' : 'white' }}
                        className={"arrowButton"}
                        onClick={() => moveCenterViewPoint(MapMove.LEFT)}>
                    <Image width={20} height={20} src={"/media/images/arrow.svg"} alt={""}/>
                </button>
                <button style={{ transform: 'rotate(90deg)', backgroundColor:
                        pressedKey === 'ArrowDown' ? 'gray' : 'white' }} className={"arrowButton"}
                        onClick={() => moveCenterViewPoint(MapMove.DOWN)}>
                    <Image width={20} height={20} src={"/media/images/arrow.svg"} alt={""}/>
                </button>
                <button style={{backgroundColor: pressedKey === 'ArrowRight' ? 'gray' : 'white'}}
                        className={"arrowButton"}
                        onClick={() => moveCenterViewPoint(MapMove.RIGHT)}>
                    <Image width={20} height={20} src={"/media/images/arrow.svg"} alt={""}/>
                </button>
            </div>
        </div>
    )
}
export default ArrowKeyNavigator