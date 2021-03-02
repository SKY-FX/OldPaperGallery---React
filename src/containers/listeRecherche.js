import React, { Component, Fragment } from 'react'
import axios from 'axios'

import NavBarDetails from '../components/modules/navBar/navBarDetails'
import ListeAnnonce from '../components/modules/listeAnnonce/listeAnnonce'
// import SearchFunc from '../components/modules/searchFunction/searchfunc'
import SearchBar from '../components/modules/searchBar/searchBar'

export default class listeRecherche extends Component {

    constructor (props) {
        super(props);
        this.state = {
            searchResult : [],
            searchText : '',
            validFlag : '0'
        };
        // console.log("CONSTRUCTOR : ", this.state.searchText);
    }

    componentDidMount()
    {
        const textSearch = this.props.match.params.searchText;
        this.updateResult(textSearch);
    }

    updateResult (textSearch)
    {
        // console.log("updateResult : ", textSearch);


        const url = "/api/search.php";
        // const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/search.php";
        

        var formData = new FormData();
        formData.append('searchText', textSearch);

        // Fait appel à l'API PHP "SEARCH",  en paramètre "la recherche utilisateur"
        axios({
            method: 'post',
            url: url,
            data: formData
        })

        // Renvoie le résultat de la recherche ( objet de tableau ) au parent
        .then(response => {
            const result = response.data;
            // console.log("SEARCH FUNCTION SEARCH", textSearch);
            // console.log("SEARCH FUNCTION RESULTAT", result);

            this.setState({
                searchResult : result,
                searchText : textSearch,
                validFlag : result.titre[0]
            });
        })

        // Affiche l'erreur
        .catch(error => {
            console.log(error);
        });     
    }

    barResult = (result) => {
        this.updateResult(result); 
        window.history.pushState('', '', '/Search/' + result);
    }

    render() {
        return (
            
            <Fragment>
                {  this.state.validFlag !== '' ?
                    <div className="listeRecherche">

                        {/* Menu de recherche rapide détaillé */}
                        <NavBarDetails searchText={this.state.searchText} />

                        {/* Barre de recherche */}
                        <SearchBar return={ (result) => this.barResult(result) } />

                        { this.state.searchText !== 'Boutique' ?
                            
                            <Fragment>
                                <h1>Résultat pour la recherche</h1>
                                <h2>"{this.state.searchText}"</h2>
                            </Fragment>
                            :
                            <Fragment>
                                <h1>Toutes les annonces</h1>
                                <h2>"Lettres autographes, manuscrits, gravures"</h2>
                            </Fragment>
                        }
                        
                        {/* <SearchFunc searchText={this.state.searchText} axiosUrl={url} return={ (result) => this.searchResult(result) } /> */}
                        <ListeAnnonce liste={this.state.searchResult} isSold="true" /> 
                        {/* <br/><br/> */}
                        
                    
                    </div>
                    :
                    <div className="listeRecherche">

                        <div className="header_text" onClick={ () => this.props.history.goBack() } style={{color:"red", cursor:"pointer", textDecoration:"none"}} >Retour</div>
    
                        <SearchBar return={ (result) => this.barResult(result) } />
                        <div className="textConnexion">
                            Aucune annonce pour cette recherche !<br/>"{this.state.searchText}"
                            <br/><br/>
                            Veuillez cliquer sur <b>Recherche</b> pour visualiser toutes les annonces de la boutique.
                        </div>
                    </div>
                }
            </Fragment>
        )
    }
}
