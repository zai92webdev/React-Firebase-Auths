import React, { useState, useContext, useEffect } from 'react';
import { auth } from '../../firebase'
import Spinner from 'react-bootstrap/Spinner'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [pending, setPending] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setPending(false)

        })
        return unsubscribe
    
    }, [])

    if (pending) {
        return  <div style={{ display: 'grid', placeItems: 'center', margin: 'auto', marginTop: '40vh' }} >
        <Spinner animation="border" />
        <span>Please wait...</span>
    </div>
    }


    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function signIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function SignOut() {
        return auth.signOut()
    }

    function ResetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    const value = {
        currentUser, signUp, signIn, SignOut, ResetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}