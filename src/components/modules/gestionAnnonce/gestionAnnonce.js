import React, { Component, Fragment } from 'react'
import axios from 'axios'

import AnnonceAdmin from '../annonce/annonceAdmin'
import SearchBar from '../searchBar/searchBar'

import UserProfile from '../utiles/sessionFct'

import '../listeAnnonce/listeAnnonce.css'


export default class gestionAnnonce extends Component {

    constructor (props) {
        super(props);

        
        // console.log("SEARCHTEXT", searchText);
        this.state = {
            searchResult : [],
            searchText : ' ',
            userName : UserProfile.getName()
        };
        // console.log("MAIN : ", this.state.searchText);
    }

    componentDidMount()
    {
        // console.log("Gestion annonce");
        this.searchText(' ');
    }

    searchText = (text) => {
        const url = "/api/search.php";
            
        // En tete AXIOS + formatte la recherche pour axios
        var formData = new FormData();
        formData.append('searchText', text);

        // Fait appel à l'API PHP "SEARCH",  en paramètre "la recherche utilisateur"
        axios({
            method: 'post',
            url: url,
            data: formData
        })

        // Renvoie le résultat de la recherche ( objet de tableau ) au parent
        .then(response => {
            // console.log("SEARCH FUNCTION SEARCH", text);
            // console.log("SEARCH FUNCTION RESULTAT", response.data);
            var reponse = response.data;
            const listeRef = reponse['ref'];
            const listeAnnonces = reponse;
    

            // Vérifie si des annonces ont été trouvés (si des parametres existent)
            if (listeRef) {
                const nbParams = Object.keys(listeAnnonces).length;
                const nbAnnonce = listeRef.length;

                // convertie l'objet des parametres en tableau
                var array = Object.keys(listeAnnonces).map((key) => {
                    return listeAnnonces[key];
                }); 

                // Fabrique un tableau en réorganisant les parametres de l'annonce
                var tabParam = [];
                for (let ii=0; ii<nbAnnonce; ii++)
                {
                    tabParam[ii] = new Array(nbParams);
                    for (let jj=0; jj<nbParams; jj++)
                    {
                        tabParam[ii][jj] = array[jj][ii];
                    }
                }
            
                this.setState({
                    searchText : text,
                    searchResult : tabParam
                });
            }
        })

        // Affiche l'erreur
        .catch(error => {
            console.log(error);
        }); 
        
    }

    onClick = (e) => {
        e.preventDefault();
        this.props.history.push("/GestionAnnonces/Ajouter");
    }


    render() {
 
        // Construit les annonces
        const tab = this.state.searchResult;
        const listeAnnonce = tab.map( (param,id) => {
            return <AnnonceAdmin key={id} params={param} />
        });

        return (
            
            <Fragment>
                { this.state.userName === '' ?
                    <div className="textConnexion">
                        Vous devez être connecté pour accéder à l'espace privé !
                    </div>
                    :
                    <div className="listeRecherche">
                        <SearchBar userType={this.props.match.params.client} return={ (result) => this.searchText(result) }/>
                        <p className="_item" onClick={ this.onClick } >Ajouter une annonce</p>
                        <br/> <br/> 
                        {listeAnnonce}
                    </div>
                }
            </Fragment>
        )
    }
}
