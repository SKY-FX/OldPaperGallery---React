import React, { Component, Fragment } from 'react'
import axios from 'axios'

// import {Link} from 'react-router-dom'

import UserProfile from '../utiles/sessionFct'

export default class connexion extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            connect: true
        }
    }
    
    onSubmit = (event) => {
        event.preventDefault(); 

        const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/checkUserInBd.php";
        var formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('mot_de_passe', this.state.mot_de_passe);

        // Fait appel à l'API PHP "SEARCH",  en paramètre "la recherche utilisateur"
        axios({
            method: 'post',
            url: url,
            data: formData
        })

        // Renvoie le résultat de la recherche ( objet de tableau ) au parent
        .then(response => {
            const nomClient = response.data[0];
            const userType = response.data[1];
            var connect = false;

            if (nomClient !== 0)
            {
                connect = true;
                UserProfile.setName(nomClient);
                UserProfile.setType(userType);
                UserProfile.setEmail(this.state.email);

                if (userType==="Admin")  this.props.history.push('/Connexion/Admin');
                else if (userType==="User")  this.props.history.push('/Connexion/User');
            }
            else{
                connect = false;
            }

            this.setState({
                connect : connect
            });

            this.props.return(connect);

            // console.log("RESULTAT",connect);

            
        })

        // Affiche l'erreur
        .catch(error => {
            console.log(error);
        }); 
    }

    onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name] : value
        }) 
    }

    render() {
        return (
            <Fragment>


               <form onSubmit={this.onSubmit} >
                    <fieldset className="fieldSetConect"><legend>Connexion</legend>
                        <input className="item_connexion" equired type="text" name="email" placeholder="Email" onChange={this.onChange} /><br/>
                        <input className="item_connexion" required type="password" name="mot_de_passe" placeholder="Mot de passe" onChange={this.onChange}  /><br/>
                        <button className="connectButton" type="submit" title="Cliquez pour se connecter" onChange={this.onChange} >Connexion</button>
                    </fieldset>
                </form>
                   
                { this.state.connect === false ?
                    <div className="textConnexion">
                            La connexion a échoué !
                            <br/><br/>
                            Veuillez réessayer.
                    </div>
                    :
                    null
                }

            </Fragment>
        )
    }
}