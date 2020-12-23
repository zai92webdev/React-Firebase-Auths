import React from 'react'
import { useAuth } from '../Authentication/contexts/AuthContext'
import { Card, Container, Button } from '@material-ui/core'
import "./DashBoard.css"
import { useHistory } from 'react-router-dom'

function DashBoard() {
    const { SignOut, currentUser } = useAuth()
    const history = useHistory()

    const handler = () => {
        SignOut()
        history.push("/")
    }


    return (
        <div className="dashboard">
            <Container maxWidth="md">
                <Card variant="outlined">
                    <h1>Profile</h1>

                    <strong>Email : </strong>{currentUser.email}<br />
                    <strong>Username : </strong>{currentUser.displayName}

                    <div className="landingpage__button">
                        <Button onClick={handler} style={{ margin: '1rem' }} color="primary" variant="contained">Log Out</Button>


                    </div>
                </Card>
            </Container>
        </div>
    )
}

export default DashBoard
