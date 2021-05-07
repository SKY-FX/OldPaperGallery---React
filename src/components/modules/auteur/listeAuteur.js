import React, { Component, Fragment } from 'react'
import { Helmet } from "react-helmet"
import {Link} from 'react-router-dom'
import axios from 'axios'

import './auteur.css'

export default class auteur extends Component {

    state = {
        result : []
    }

    componentDidMount() {

        var elmnt = document.getElementById("scrollInto");
        elmnt.scrollIntoView();
        
        // En tete AXIOS + formatte la recherche pour axios
        const url = "/api/searchAuteur.php";
		// const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/searchAuteur.php";
        

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

        var firstLetter = '';
        const listeAuteur = tabResult.map( (auteur, id) => {
            const searchText = "/Search/" + auteur;
            
            if (auteur[0]!==firstLetter) {
                firstLetter = auteur[0];
                return (
                    <Fragment>
                        <div className="uneLettre">{firstLetter}</div>
                        <Link to={searchText} className="unAuteur" key={id}>{auteur}</Link>
                    </Fragment>
                )
            }
            else{
                return (
                    <Link to={searchText} className="unAuteur" key={id}>{auteur}</Link>
                )
            }

            // console.log("auteur",auteur[0]);
            });

        
        return (
            <div className="auteur" id="scrollInto">
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="author" content="Chabaud Sylvain - web developer"></meta>
                    <title>Autographes - manuscrits - gravures : Old Paper Gallery</title>
                    <meta name="description" content="Nous achetons et vendons des lettres autographes, manuscrits, gravures et documents anciens"/>
                    <link rel="canonical" href="https://www.oldpapergallery.com/SearchAuteurs" />
                </Helmet>

                {listeAuteur}
            </div>
        )
    }
}
