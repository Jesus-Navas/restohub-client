import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { verify } from '../services/auth.services';

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(undefined)

    const storeToken = (token) => {
        localStorage.setItem('authToken', token)
    }

    const authenticateUser = () => {

        const storedToken = localStorage.getItem('authToken')

        if (storedToken) {
            verify(storedToken)
                .then((response) => {
                    let { username } = response.data.authenticatedUser
                    setIsLoggedIn(true)
                    setUser(username)
                })
                .catch((err) => {
                    console.error(err)
                    setIsLoggedIn(false)
                    setUser(null)
                })
        } else {
            setIsLoggedIn(false)
            setUser(null)
        }
    }

    const removeToken = () => {
        localStorage.removeItem('authToken')
    }

    const logOutUser = () => {
        removeToken()
        authenticateUser()
        Router.push("/")
    }

    useEffect(() => {
        authenticateUser()
    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, storeToken, authenticateUser, logOutUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthProviderWrapper, AuthContext }