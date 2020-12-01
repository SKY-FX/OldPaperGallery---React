import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import UserProfile from '../utiles/sessionFct'

import "./client.css"

export default class client extends Component {

    constructor (props) {
        super(props);
        this.state = {
            userName : '',
            userType : this.props.match.params.client
        }
    }

    componentDidMount()
    {
        const userName = UserProfile.getName();
        console.log("SESSION", userName);
        
        this.setState({
            userName : userName
        })
    }

    render() {
        return (
            <Fragment>

                { this.state.userName === '' ?
                    
                    <div className="textConnexion">
                        Vous devez être connecté pour accéder à l'espace privé !
                    </div>
                    
                    :
                    <Fragment >
                        { this.state.userType==='Admin' ?
                            <Fragment >
                                    <div className="zone">
                                        Bienvenue dans votre espace privé {this.state.userName} !
                                        <div className="menuAdmin">
                                            <Link className="itemMenu" to="/GestionAnnonces/" style={{color:"white"}}>Mes annonces</Link>
                                            <Link className="itemMenu" to="/GestionMessagerie/" style={{color:"white"}}>Mes messages</Link>
                                            <Link className="itemMenu" to="/GestionVentes/" style={{color:"white"}}>Mes ventes</Link>
                                        </div>
                                    </div>
                            </Fragment>
                            :
                            null
                        }
                        { this.state.userType==='User' ?
                            <Fragment >
                                    <div className="zone">
                                        Bienvenue dans votre espace privé {this.state._SESSION} !
                                        <div className="menuAdmin">
                                            <Link className="itemMenu" to="/GestionMessagerie" style={{color:"white"}}>Mes messages</Link>
                                        </div>
                                    </div>
                            </Fragment>
                            :
                            null
                        }
                    </Fragment>
                }

            </Fragment>

            
        )
    }
}
