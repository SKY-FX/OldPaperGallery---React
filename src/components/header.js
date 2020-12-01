import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import NavLogo from './modules/navLogo/navLogo'

export default class header extends Component {

    render() {
        return (
            <div className="header">
                <NavLogo />
            </div>
        )
    }
}
