import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import './auteur.css'

export default class auteur extends Component {

    state = {
        result : []
    }

    componentDidMount() {
        
        // En tete AXIOS + formatte la recherche pour axios
        const url = "/api/searchAuteur.php";

        // Fait appel à l'API PHP "SEARCH",  en paramètre "la recherche utilisateur"
        axios({
            method: 'post',
            url: url,
            data: ''
        })

        // Renvoie le résultat de la recherche ( objet de tableau ) au parent
        .then(response => {
            // console.log("RESULTAT", response.data);
            this.setState({
                result : response.data
            });
        })

        // Affiche l'erreur
        .catch(error => {
            console.log(error);
        }); 
    }

    render() {

        const tabResult = this.state.result;
        const listeAuteur = tabResult.map( (auteur, id) => {
            const searchText = "/Search/" + auteur
            return <Link to={searchText} className="unAuteur" key={id}>{auteur}</Link>
        });

        
        return (
            <div className="auteur">
                {listeAuteur}
            </div>
        )
    }
}
