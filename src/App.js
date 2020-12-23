import React from 'react';
import './App.css';
import { AuthProvider } from './Authentication/contexts/AuthContext';
import SignUp from './Authentication/SignUp'
import SignIn from './Authentication/SignIn'
import ForgotPassword from './Authentication/ForgotPassword'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from './components/LandingPage'
import DashBoard from './components/DashBoard'
import PrivateRoute from './components/PrivateRoute'
import UpdateProfile from './Authentication/UpdateProfile'


const NotFoundPage = () => {
  return <h1 style={{ textAlign: 'center' }}>404 NOT FOUND</h1>
}

function App() {
  return (
    <AuthProvider>

      <Router>
        <div className="App">
          <Switch>

            <Route exact path="/">
              <LandingPage />
            </Route>

            <PrivateRoute exact path="/dashboard" component={DashBoard} />

            <Route exact path="/signin">
              <SignIn />
            </Route>

            <Route exact path="/signup">
              <SignUp />
            </Route>

            <Route exact path="/forgot-password">
              <ForgotPassword />
            </Route>

            <Route exact path="/update-profile">
              <UpdateProfile />
            </Route>


            <Route path="*" component={NotFoundPage} />

          </Switch>

        </div>
      </Router>
    </AuthProvider>
  );


}

export default App;
