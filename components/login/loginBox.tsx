import Box from "../global/box";
import Input from "../global/input";
import {useState} from "react";
import Link from "next/link";
import {UserLoginResponse} from "../../types/ApiResponseTypes";

interface Props {
    submitLogin: (email: string, password: string) => UserLoginResponse
}
const LoginBox = ({} : Props) => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [emailError, setEmailError] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")


    const login = () => {
        console.log(email)
        console.log(password)
    }

    return (
        <Box>
            <h2>Login</h2>
            <Input errorMessage={emailError} setValue={setEmail} type={"email"} />
            <Input errorMessage={passwordError} setValue={setPassword} type={"password"} />
            <button onClick={() => login()}>Login</button>
            <Link href={"/register"}>Register new user</Link>
        </Box>
    )
}
export default LoginBox