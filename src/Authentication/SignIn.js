import { Card, Container, FormHelperText, FormControl, Input, InputLabel, Typography, Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import React, { useRef, useState } from 'react'
import './SignIn.css'
import { Link, Redirect } from "react-router-dom";
import { useAuth } from './contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'


function SignIn() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { signIn, currentUser } = useAuth()
    const [pending, setPending] = useState(false)

    if (pending) {
        return  <div style={{ display: 'grid', placeItems: 'center', margin: 'auto', marginTop: '40vh' }} >
        <Spinner animation="border" />
        <span>Wait for verification...</span>
    </div>
    }

    const handler = async (e) => {
        e.preventDefault()
        setPending(true)
        try {
            setError('')
            setLoading(true)
            await signIn(emailRef.current.value, passwordRef.current.value)
        } catch (err) {
            const errorMessage = err.message;
            setError(errorMessage)
        }
        setLoading(false)
        setPending(false)
    }

    if(currentUser){
        return <Redirect to="/dashboard" />
    }
    

    return (

        <div className="signin" >
            
            <Container style={{ textAlign: 'center' }} maxWidth="sm">
                
                <Card variant="outlined" >
                    <Typography style={{ marginTop: '1rem' }} variant='h2'>
                        Sign In
                    </Typography>

                    <Link to="/">Home</Link>

                    {error && <Alert variant="filled" severity="error">{error}</Alert>}

                    <form className="signin__form" onSubmit={handler} >
                        <FormControl style={{ margin: '1rem' }}>
                            <InputLabel htmlFor="my-input">Email address</InputLabel>
                            <Input inputRef={emailRef} variant="outlined" aria-describedby="my-helper-text" type='email' autoComplete="email" required />
                            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                        </FormControl>

                        <FormControl style={{ margin: '1rem' }} >
                            <InputLabel htmlFor="my-input">Password</InputLabel>
                            <Input inputRef={passwordRef} variant="outlined" type="password" autoComplete="new-password" required />
                        </FormControl>

                        <Button disabled={loading} type="submit" color="secondary" variant="contained">Sign In</Button>
                    </form>

                    <Typography style={{ marginBottom: '1rem' }}>
                        <Link to="/forgot-password">Forgot Password</Link>
                    </Typography>


                    <Typography style={{ marginBottom: '1rem' }}>
                        Don't have an account ? <Link to="/signup" >Sign Up now</Link>
                    </Typography>


                </Card>
            </Container>

        </div>

    )
}

export default SignIn
