import React from 'react';
import { connect } from 'react-redux';

const bcrypt = require('bcryptjs');

class Register extends React.Component {

    onRegister = () => {
        let { dispatch } = this.props;
        if (this.props.password) {
            let hashed = bcrypt.hashSync(this.props.password, 10);
            let body = JSON.stringify({
                username: this.props.username,
                password: hashed,
                email: this.props.email
            });
            fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            })
                .then(
                        response => {
                            if (response.status === 409) {
                                dispatch({ type: 'REGISTRATION_STATUS', payload: 'fail' });
                                dispatch({ type: 'REGISTER_ERR', payload: 'Username already exists!' });
                                throw new Error('EXISTS');
                            }
                        (response.status === 201) ? dispatch({ type: 'REGISTRATION_STATUS', payload: 'success' })
                            : dispatch({ type: 'REGISTRATION_STATUS', payload: 'fail' });
                        return response.json();
                    })
                .then(
                    response => {
                        dispatch({ type: 'REGISTER_RESULTS', payload: response })
                        let error = [];
                        if (response.Username) {
                            error.push(response.Username[0]);
                        }
                        if (response.Email) {
                            error.push(response.Email[0]);
                        }
                        if (response.Password) {
                            error.push(response.Password[0]);
                        }
                        dispatch({ type: 'REGISTER_ERR', payload: error.join('\n') })
                        console.log(this.props.err)
                    }
            ).catch((err) => {
                return null;
                });
        }
        else {
            dispatch({ type: 'REGISTER_ERR', payload: 'Password is required' })
        }
    }

    registrationMessage() {
        console.log(this.props.registrationStatus)
        const regStatus = this.props.registrationStatus;
        if (regStatus == "success") {
            return "Successfully registered!";
        } else if (regStatus == "fail") {
            return "Registration failed, please address the following errors: "
        } else {
            return "";
        }
    }

    handleUsernameChange = (event) => {
        let { dispatch } = this.props;
        dispatch({ type: 'REGISTER_USERNAME', payload: event.target.value })
    }
    handlePasswordChange = (event) => {
        let { dispatch } = this.props;
        dispatch({ type: 'REGISTER_PASSWORD', payload: event.target.value })
    }
    handleEmailChange = (event) => {
        let { dispatch } = this.props;
        dispatch({ type: 'REGISTER_EMAIL', payload: event.target.value })
    }

    render() {
        return <div className="container">
            <h1>Registration Page</h1>
            <hr />
            <p>Please fill in the required information below to register</p>
            <form>
                <div className="form-group">
                    <label for="username">Username:</label>
                    <input className="form-control" type="text" placeholder="Username (at least 3 characters)" id="username" required
                        onChange={this.handleUsernameChange} value={this.props.username} />
                </div>
                <div className="form-group">
                    <label for="email">Email Address:</label>
                    <input className="form-control" type="text" placeholder="you@example.com" id="email" required
                        onChange={this.handleEmailChange} value={this.props.email} />
                </div>
                <div className="form-group">
                    <label for="password">Password:</label>
                    <input className="form-control" type="password" placeholder="At least 6 characters" id="password" required
                        onChange={this.handlePasswordChange} value={this.props.password} />
                </div>
            </form>
            <button className="btn btn-lg btn-primary" type="submit" value="submit" onClick={this.onRegister}>Register</button>
            <div className="results">{this.registrationMessage()}</div>
            <div className="results">{this.props.err}</div>
        </div>;
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
    }
}

export default connect(mapStateToProps)(Register);