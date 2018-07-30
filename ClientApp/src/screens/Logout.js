import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';

import PageHeader from '../components/pageHeader';

class Logout extends React.Component {

    logOut = () => {
        localStorage.clear();
    }

    handleLogOff = () => {
        this.logOut();
    }

    onConfirm = () => {
        if (localStorage.getItem('auth_token') == null) {
            alert("You must be logged in to log off.")
            return <Redirect to='login' />
        }
        else {
            if (window.confirm("Are you sure you want to log out?")) {
                this.handleLogOff();
                if (localStorage.getItem('auth_token') == null) {
                    alert("Log off successful.")
                    return <Redirect to='login' />
                }
            }
        }
    }

    render() {
        return <div>
            {this.onConfirm()}
            {this.props.history.push('/')}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        bands: state.bands,
    }
}

export default connect(mapStateToProps)(Logout);