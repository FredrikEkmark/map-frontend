import "@/styles/global/global.css";
import {HTMLInputTypeAttribute} from "react";

interface Props {
    type: HTMLInputTypeAttribute
    alternativeLabel?: string
    setValue: (value: string) => void
    errorMessage: string
}
const Input = ({type, setValue, errorMessage, alternativeLabel} : Props) => {

    const typeLabel = () => {
        const typeString: string = type
        if (alternativeLabel) {
            return <label>{alternativeLabel.charAt(0).toUpperCase() + alternativeLabel.slice(1)}<p>{errorMessage}</p></label>
        }
        if (typeString.length === 0) {
            return <label>NO INPUT TYPE</label>
        }
        return (<label>{typeString.charAt(0).toUpperCase() + typeString.slice(1)}<p>{errorMessage}</p></label>)
    }

    const assignClass = () => {
        if (errorMessage !== "") {
            return "input error"
        }
        return "input"
    }

    return (
        <div className={assignClass()}>
            {typeLabel()}
            <input onChange={event => {setValue(event.target.value)}} type={type} placeholder={"Type your " + type}/>
        </div>
    )
}
export default Input