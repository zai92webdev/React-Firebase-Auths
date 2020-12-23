import { Card, Container, FormHelperText, FormControl, Input, InputLabel, Typography, Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import React, { useRef, useState } from 'react'
import './SignUp.css'
import { useAuth } from './contexts/AuthContext'
import { Link, useHistory,Redirect } from 'react-router-dom'

function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { signUp,currentUser } = useAuth()
    const history = useHistory()



    const handler = async (e) => {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('password do not match')
        }
        try {
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
            history.push("/dashboard")
        } catch (err) {
            const errorCode = err.code;
            const errorMessage = err.message;
            if (errorCode === 'auth/weak-password') {
                setError(errorCode)
            } else {
                setError(errorMessage)
            }
        }
        setLoading(false)
    }

    if(currentUser){
        return <Redirect to="/dashboard" />
    }


    return (

        <div className="signup" >
            <Container style={{ textAlign: 'center' }} maxWidth="sm">
                <Card variant="outlined" >
                    <Typography style={{ marginTop: '1rem' }} variant='h2'>
                        Sign Up
                    </Typography>

                    <Link to="/">Home</Link>

                    {error && <Alert variant="filled" severity="error">{error}</Alert>}

                    <form className="signup__form" onSubmit={handler} >
                        <FormControl style={{ margin: '1rem' }}>
                            <InputLabel htmlFor="my-input">Email address</InputLabel>
                            <Input inputRef={emailRef} variant="outlined" aria-describedby="my-helper-text" type='email' autoComplete="email" required />
                            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                        </FormControl>

                        <FormControl style={{ margin: '1rem' }} >
                            <InputLabel htmlFor="my-input">Password</InputLabel>
                            <Input inputRef={passwordRef} variant="outlined" type="password" autoComplete="new-password" required />
                        </FormControl>

                        <FormControl style={{ margin: '1rem' }} >
                            <InputLabel htmlFor="my-input">Password Confirm</InputLabel>
                            <Input inputRef={passwordConfirmRef} variant="outlined" type="password" autoComplete="current-password" required />
                        </FormControl>

                        <Button disabled={loading} type="submit" color="primary" variant="contained">Sign Up</Button>
                    </form>


                    <Typography style={{ marginBottom: '1rem' }}>
                        Already have an account ? <Link to="/signin">Sign In now</Link>
                    </Typography>



                </Card>
            </Container>

        </div>
    )
}

export default SignUp
