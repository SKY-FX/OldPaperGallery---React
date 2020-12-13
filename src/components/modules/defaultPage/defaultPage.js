import React, { Component } from 'react'

export default class defaultPage extends Component {
    render() {
        return (
            <div className="textConnexion">
                <div className="header_text" onClick={ () => this.props.history.goBack() } style={{color:"red", cursor:"pointer", textDecoration:"none"}} >Retour</div>
    
                ERROR 404 : Page non trouvée !
            </div>
        )
    }
}
