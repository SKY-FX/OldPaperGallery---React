import React, { Component } from 'react'
// import NavBar from './modules/navBar/navBar'
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
