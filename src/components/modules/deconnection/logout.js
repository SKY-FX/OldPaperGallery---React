import React, { Component, Fragment } from 'react'
import UserProfile from '../utiles/sessionFct'

export default class logout extends Component {

    componentDidMount()
    {
        this.props.return(false);
        UserProfile.setName('');
        UserProfile.setType('');
        this.props.history.push('/');
    }

    render() {
        return (
            <Fragment />
        )
    }
}

