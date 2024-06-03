"use client"

import RegisterBox from "../../../components/login/registerBox";
import {UserRegistrationResponse} from "../../../types/ApiResponseTypes";

const Register = () => {

    const submit = (username: string, email: string, password: string): UserRegistrationResponse  => {

        return {success: true, emailError: "", usernameError: ""}
    }

    return (
        <div className={"centered"}>
            <RegisterBox submitRegistration={submit}/>
        </div>
    );
}

export default Register;
