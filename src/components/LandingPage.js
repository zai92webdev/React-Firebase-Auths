import React from 'react';
import { Card, Container, Typography, Button } from '@material-ui/core'
import './LandingPage.css'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../Authentication/contexts/AuthContext'



function LandingPage() {
    const history = useHistory()
    const { currentUser } = useAuth()

    const handler = () => {
        if (!currentUser) {
            alert('please login first')
            history.push("/signin")
        } else {
            history.push("/dashboard")
        }
    }

    return (
        <div className="landingpage">

            <Container style={{ textAlign: 'center' }} maxWidth="sm">
                <Card variant="outlined" >
                    <Typography variant="h3">
                        Home
                    </Typography>

                    <Typography variant="h6">
                        {!currentUser ? "Hello Guest" : currentUser.email}
                        
                    </Typography>

                    <div className="landingpage__button">
                        <Button onClick={handler} style={{ margin: '1rem' }} color="primary" variant="contained">Dashboard</Button>

                        {!currentUser ? <Button onClick={() => { history.push('/signin') }} style={{ margin: '1rem' }} color="primary" variant="contained">Sign In</Button> : null }

                        {!currentUser ? <Button onClick={() => { history.push('/signup') }} style={{ margin: '1rem' }} color="primary" variant="contained">Sign Up</Button> : null }
                        
                    </div>


                </Card>
            </Container>

        </div>

    )
}

export default LandingPage
