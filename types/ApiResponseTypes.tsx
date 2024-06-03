

export type UserRegistrationResponse = {
    success: boolean
    usernameError: string
    emailError: string
}

export type UserLoginResponse = {
    success: boolean
    error: string
}