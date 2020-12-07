import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import UserProfile from '../utiles/sessionFct'

import "./client.css"

export default class client extends Component {

    constructor (props) {
        super(props);
        this.state = {
            userName : '',
            userType : ''
        }
    }

    componentDidMount()
    {
        const userName = UserProfile.getName();
        // console.log("SESSION", userName);
        
        this.setState({
            userName : userName,
            userType : this.props.match.params.client
        })
    }

    render() {
        // console.log("SESSION1", this.state.userName);
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
                                        Bienvenue dans votre espace privé {this.state.userName} !
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
