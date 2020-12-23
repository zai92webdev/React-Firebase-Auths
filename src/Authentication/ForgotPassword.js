import { Card, Container, FormHelperText, FormControl, Input, InputLabel, Typography, Button } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import React, { useRef, useState } from 'react'

import { Link } from "react-router-dom";
import { useAuth } from './contexts/AuthContext'

function SignIn() {
    const emailRef = useRef()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { ResetPassword } = useAuth()
    const [message, setMessage] = useState('')

    const handler = async (e) => {
        e.preventDefault()

        await ResetPassword(emailRef.current.value).then(res => {
            setError('')
            setLoading(true)
            setMessage('Success, check your inbox for further instruction')
        }).catch(err => { setError(err.message) })

        setLoading(false)
    }



    return (

        <div className="forgotpassword" style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
            <Container style={{ textAlign: 'center' }} maxWidth="sm">
                <Card variant="outlined" >
                    <Typography style={{ marginTop: '1rem' }} variant='h2'>
                        Forgot Password
                    </Typography>

                    <Link to="/">Home</Link>

                    {error && <Alert variant="filled" severity="error">{error}</Alert>}
                    {message && <Alert variant="filled" severity="success">{message}</Alert>}

                    <form className="signin__form" onSubmit={handler} >
                        <FormControl style={{ margin: '1rem' }}>
                            <InputLabel htmlFor="my-input">Email address</InputLabel>
                            <Input inputRef={emailRef} variant="outlined" aria-describedby="my-helper-text" type='email' autoComplete="email" required />
                            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                        </FormControl>

                        <Button disabled={loading} type="submit" color="secondary" variant="contained">Reset Password</Button>
                    </form>
                    <Typography>
                        <Link to="/signin" >Login</Link>
                    </Typography>


                    <Typography style={{ margin: '1rem' }}>
                        Don't have an account ? <Link to="/signup" >Sign Up now</Link>
                    </Typography>

                </Card>
            </Container>

        </div>

    )
}

export default SignIn
