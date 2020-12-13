import React, { Component } from 'react'
import NavLogo from './modules/navLogo/navLogo'
import {Link} from 'react-router-dom'

export default class header extends Component {

    render() {
        return (
            <div className="header">
                <NavLogo />

                {/* <Link to="/Contact/" className="header_contact" style={{color:"#fff6c5", cursor:"pointer", textDecoration:"none"}} title="Page de contact - Old Paper Gallery"> */}
                <Link to="/Contact/" className="header_contact" style={{color:"red", cursor:"pointer", textDecoration:"none"}} title="Page de contact - Old Paper Gallery">
                    Qui sommes Nous ?
                </Link>
                
            </div>
        )
    }
}
