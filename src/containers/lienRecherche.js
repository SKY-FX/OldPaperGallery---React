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
            validFlag : '0'
        }

        // console.log("SEARCH 1", props.match.params.searchText);
        // console.log("SEARCH 2", props.match.params.searchTextDetails);
    }

    componentDidMount() {
        
        // En tete AXIOS + formatte la recherche pour axios
        const url = "/api/searchDetails.php";
        // const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/searchDetails.php";
        
        var formData = new FormData();
        formData.append('searchText', this.props.match.params.searchText);
        formData.append('searchTextDetails', this.props.match.params.searchTextDetails);

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
                validFlag : result.titre[0]
            });
        })

        // Affiche l'erreur
        .catch(error => {
            console.log(error);
        });
        
    }


    searchResult = (result) => {
        this.props.history.push('/Search/' + result)
    }


    render() {
        const validFlag = this.state.validFlag;
        // console.log("RENDER", validFlag)
        return (
            <div className="lienRecherche"> 

                <div className="header_text" onClick={ () => this.props.history.goBack() } style={{cursor:"pointer", textDecoration:"none"}} >Retour</div>
                <SearchBar return={ (result) => this.searchResult(result) } />
                
                <Fragment>
                    { validFlag !== "" ?
                        <Fragment>
                            { this.props.match.params.searchText !== '%20' ?
                                <Fragment>
                                    <h1>Résultat pour la recherche</h1>
                                    <h2>"{this.props.match.params.searchText} --> {this.props.match.params.searchTextDetails}"</h2>
                                </Fragment>
                                :
                                <Fragment>
                                    <h1>Toutes les annonces</h1>
                                    <h2>"Lettres autographes, manuscrits, gravures"</h2>
                                </Fragment>
                            }
                            <ListeAnnonce liste={this.state.searchResult} isSold="true"/>
                        </Fragment>
                        : 
                        <Fragment>    
                            <div className="textConnexion">
                                Aucune annonce pour cette recherche !
                                <br/>"{this.props.match.params.searchText} | {this.props.match.params.searchTextDetails}"
                                <br/><br/>
                                Veuillez cliquer sur <b>Recherche</b> pour visualiser toutes les annonces de la boutique.
                            </div>
                        </Fragment>
                    }
                </Fragment>
            </div>
        )
    }
}

