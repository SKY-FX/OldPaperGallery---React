import React, { Component, Fragment } from 'react'
import axios from 'axios'

import ListeAnnonce from '../components/modules/listeAnnonce/listeAnnonce'
import SearchBar from '../components/modules/searchBar/searchBar'

export default class lienRecherche extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            searchResult : [],
            searchText : props.match.params.searchText, // Recupère le props (match.params...) passé en url
            searchTextDetails : props.match.params.searchTextDetails
        }

        // console.log("SEARCH 1", props.match.params.searchText);
        // console.log("SEARCH 2", props.match.params.searchTextDetails);
    }

    componentDidMount() {
        
        // En tete AXIOS + formatte la recherche pour axios
        const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/searchDetails.php";
        var formData = new FormData();
        formData.append('searchText', this.state.searchText);
        formData.append('searchTextDetails', this.state.searchTextDetails);

        // console.log("DETAILS", this.state.searchTextDetails);
        // Fait appel à l'API PHP "SEARCH",  en paramètre "la recherche utilisateur"
        axios({
            method: 'post',
            url: url,
            data: formData
        })

        // Renvoie le résultat de la recherche ( objet de tableau ) au parent
        .then(response => {
            // console.log("RESULTAT", response.data);
            const result = response.data;
            this.setState({
                searchResult : result,
            });
        })

        // Affiche l'erreur
        .catch(error => {
            console.log(error);
        });
        
    }


    searchResult = (result) => {
        // console.log("SEARCH BIS :", result)

        if (result !== '') {
            this.props.history.push('/search/' + result)
        }   
    }


    render() {
        const validFlag = this.state.searchResult.titre;
        return (
            <div className="lienRecherche"> 
                <SearchBar return={ (result) => this.searchResult(result) } />
                <Fragment>
                    { validFlag !== '' ?
                        <ListeAnnonce liste={this.state.searchResult} isSold="true"/>
                        : 
                        <div className="textConnexion">
                            Aucun(e) <b>{this.state.searchText}</b> pour le thème <b>{this.state.searchTextDetails}</b> !
                            <br/><br/>
                            Veuillez cliquer sur <b>Recherche</b> pour visualiser toutes les annonces de la boutique.
                        </div>
                    }
                </Fragment>
            </div>
        )
    }
}

