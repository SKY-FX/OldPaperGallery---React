import React, { Component } from 'react'

export default class defaultPage extends Component {
    render() {
        return (
            <div className="textConnexion">
                <div className="header_text" onClick={ () => this.props.history.goBack() } style={{color:"rgba(255,255,255,0.5)", cursor:"pointer", textDecoration:"none"}} >Retour</div>
    
                ERROR 404 : Page non trouvée !
            </div>
        )
    }
}
