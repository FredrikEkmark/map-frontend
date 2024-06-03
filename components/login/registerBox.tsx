import Box from "../global/box";
import Input from "../global/input";
import {useState} from "react";
import Link from "next/link";
import {UserRegistrationResponse} from "../../types/ApiResponseTypes";

interface Props {
    submitRegistration: (username: string, email: string, password: string) => UserRegistrationResponse
}
const RegisterBox = ({submitRegistration} : Props) => {

    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const [usernameError, setUsernameError] = useState<string>("")
    const [emailError, setEmailError] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("")

    const isValidUsername = (): boolean => {
        const minLength = 6;
        const validPattern = /^[a-zA-Z0-9]+$/;

        if (username.length < minLength) {
            return false;
        }

        return validPattern.test(username);
    }

    const isValidEmail = (): boolean => {
        const minLength = 6;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.length < minLength) {
            return false;
        }

        return emailPattern.test(email);
    }

    const isValidPassword = (): boolean => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/;
        const hasNumber = /[0-9]/;

        if (password.length < minLength) {
            return false;
        }

        if (!hasUpperCase.test(password)) {
            return false;
        }

        return hasNumber.test(password);
    }



    const submit = () => {

        let error = false

        if (!isValidUsername()) {
            error = true
            setUsernameError("*Min of 6 characters, A-Z, 1-9*")
        }

        if (!isValidEmail()) {
            error = true
            setEmailError("*Not a valid email*")
        }

        if (!isValidPassword()) {
            error = true
            setPasswordError("*Min of 8 characters, 1 cap, 1 num*")
        }

        if (confirmPassword !== password) {
            error = true
            setConfirmPasswordError("*Passwords do not match*")
        }

        if (!error) {
            const submitResponse = submitRegistration(username, email, password)

            if (submitResponse.success) {
                window.location.href = '/login2';
            }

            setUsernameError(submitResponse.usernameError)
            setEmailError(submitResponse.emailError)
        }
    }

    return (
        <Box>
            <h2>Register User</h2>
            <Input errorMessage={usernameError} setValue={setUsername} type={"username"} />
            <Input errorMessage={emailError} setValue={setEmail} type={"email"} />
            <Input errorMessage={passwordError} setValue={setPassword} type={"password"} />
            <Input alternativeLabel={"Confirm Password"} errorMessage={confirmPasswordError} setValue={setConfirmPassword} type={"password"} />
            <button onClick={() => submit()}>Submit</button>
            <Link href={"/login2"}>Login page</Link>
        </Box>
    )
}
export default RegisterBox