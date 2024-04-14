"use client"

import {useEffect} from "react";

const Login = () => {
    useEffect(() => {
        // Function to extract token from URL query parameters
        const extractTokenFromURL = () => {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('token');
        }

        // Function to store token in local storage
        const storeTokenInLocalStorage = (token: string) => {
            localStorage.setItem('token', token);
        }

        // Extract token from URL and store in local storage
        const token = extractTokenFromURL();
        if (token) {
            storeTokenInLocalStorage(token);
            // Redirect back to frontend A's home page
            window.location.href = 'http://localhost:8080/';
        } else {
            window.location.href = 'http://localhost:8080/login';
        }
    }, []);

    return (
        <div>About</div>
    );
}

export default Login;
