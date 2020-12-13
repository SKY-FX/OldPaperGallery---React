import React from 'react'
import {Link} from 'react-router-dom'

import './navLogo.css'

export default function navLogo() {

    return (
        <div className="navLogo">
            <Link to="/" title="Page d'accueil - Old Paper Gallery">
                Old Paper Gallery
            </Link>
        </div>  
    )
}
