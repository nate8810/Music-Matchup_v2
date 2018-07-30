import React from 'react';
import { connect } from 'react-redux';

const bcrypt = require('bcryptjs');

class Login extends React.Component {

    onLogin = () => {
        let { dispatch } = this.props;
        if (this.props.password) {
            // Get the user object for the username submitted so we can check the hashed password
            fetch(`api/users/login/${this.props.username}`)
                .then(response => { return response.json() })
                .then(response => {
                    console.log(response);
                    // Verify typed password matches hashed password
                    if (bcrypt.compareSync(this.props.password, response.password)) {
                        // When bcrypt verifies the passwords match
                        console.log("Successful login");
                        let body = JSON.stringify({
                            username: this.props.username,
                            password: response.password
                        });
                        fetch('api/Login/token', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: body
                        })
                            .then(
                                response => {
                                    (response.status === 200) ? dispatch({ type: 'LOGIN_UPDATE_LOGGEDIN', payload: 'success' })
                                        : dispatch({ type: 'LOGIN_UPDATE_LOGGEDIN', payload: 'fail' });
                                    return response.json();
                                })
                            .then(
                                response => {
                                    localStorage.setItem('auth_token', response);
                                    console.log(response);
                                });
                    } else {
                        // When bcrypt sees passwords don't match
                        console.log("No can do neckface");
                        dispatch({ type: 'LOGIN_UPDATE_LOGGEDIN', payload: 'fail' });
                    }
                });
        }
        else {
            console.log("No can do neckface");
            dispatch({ type: 'LOGIN_UPDATE_LOGGEDIN', payload: 'fail' });
        }
    }

    handleUsernameChange = (event) => {
        let { dispatch } = this.props;
        dispatch({ type: 'LOGIN_ADD_USERNAME', payload: event.target.value })
    }
    handlePasswordChange = (event) => {
        let { dispatch } = this.props;
        dispatch({ type: 'LOGIN_ADD_PASSWORD', payload: event.target.value })
    }

    clearStatus = () => {
        this.props.dispatch({ type: 'LOGIN_UPDATE_LOGGEDIN', payload: '' });
    }

    loginMessage() {
        let loggedInStatus = this.props.loggedIn;
        if (loggedInStatus == "success") {
            alert("Login Successful!");
            this.props.history.push('/');
            this.clearStatus();
            return "Login successful!";
        } else if (loggedInStatus == "fail") {
            return "You dun messed up A A Ron: Your username or password is incorrect. ";
        } else {
            return "";
        }
    }

    render() {
        return (
        <div className="container">
            <h1>Login Page </h1>
            <hr/>
            <p> Please fill in the required information below to log in </p>
            <form>
                <div className="form-group">
                    <label for="username">Username: *</label>
                    <input className="form-control" type="text" placeholder="Username" id="username" required
                        onChange={this.handleUsernameChange} value={this.props.username} />
                </div>
                <div className="form-group">
                    <label for="password">Password: *</label>
                    <input className="form-control" type="password" placeholder="Password" id="password" required
                        onChange={this.handlePasswordChange} value={this.props.password} />
                </div>
            </form>
            <p className="mm-requiredNote">Fields marked with * are required</p>
            <div>
                <button className="btn btn-lg btn-primary" onClick={this.onLogin}>Login</button>
                <div className="results">{this.loginMessage()}</div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(Login);