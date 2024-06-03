"use client"

import LoginBox from "../../../components/login/loginBox";
import {UserLoginResponse} from "../../../types/ApiResponseTypes";

const Login = () => {

    const submit = (username: string, password: string): UserLoginResponse => {

        return {success: true, error: ""}
    }

    return (
        <div className={"centered"}>
            <LoginBox submitLogin={submit}/>
        </div>
                );
}

export default Login;
