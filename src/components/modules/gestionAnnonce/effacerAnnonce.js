import React, { Component, Fragment } from 'react'
import axios from 'axios'

import UserProfile from '../utiles/sessionFct'

export default class effacerAnnonce extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            userName : ''
        };

    }

    componentDidMount()
    {
        const userName = UserProfile.getName();
        this.setState({
            userName : userName
        });

        if (userName !== '') 
        {
            const url = "/api/effaceAnnonce.php";
            // const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/effaceAnnonce.php";


            const id = this.props.match.params.idAnnonce;

            // En tete AXIOS + formatte la recherche pour axios
            var formData = new FormData();
            formData.append('id', id);
        
            if (window.confirm( "Etes-vous sûr de vouloir supprimer cette annonce ?" )) 
            {
                // Fait appel à l'API PHP "SEARCH",  en paramètre "la recherche utilisateur"
                axios({
                    method: 'post',
                    url: url,
                    data: formData
                })
            
                // Renvoie le résultat de la recherche ( objet de tableau ) au parent
                .then(response => {
                    // console.log("Efface", props.match.params.idAnnonce);
                    // console.log("Efface RESULTAT", response.data);
                })
            
                // Affiche l'erreur
                .catch(error => {
                    console.log(error);
                }); 
            }
            this.props.history.push("/GestionAnnonces/");
        }

        
    }

    render() {
        return (
            <Fragment>
                { this.state.userName === '' ?
                    <div className="textConnexion">
                        Vous devez être connecté pour accéder à l'espace privé !
                    </div>
                    :
                    null
                }
            </Fragment>
        )
    }
}
