import React, { Component, Fragment } from 'react'
import { Helmet } from "react-helmet"
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
        
        var elmnt = document.getElementById("scrollInto");
        elmnt.scrollIntoView();

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

    ScrollFunction = () => 
    {
        var elmnt = document.getElementById("scrollInto");
        elmnt.scrollIntoView({behavior: "smooth"});
    }

    render() {
        const validFlag = this.state.validFlag;
        // console.log("RENDER", validFlag)
        return (
            <div className="lienRecherche" id="scrollInto"> 

                <div className="header_text" onClick={ () => this.props.history.goBack() } style={{cursor:"pointer", textDecoration:"none"}} >Retour</div>
                <SearchBar return={ (result) => this.searchResult(result) } />
                
                <Fragment>
                    <Helmet>
                        <meta charSet="utf-8" />
                        <meta name="author" content="Chabaud Sylvain - web developer"></meta>
                        <title>Autographes - manuscrits - gravures : Old Paper Gallery</title>
                        <meta name="description" content="Nous achetons et vendons des lettres autographes, manuscrits, gravures et documents anciens"/>
                        <link rel="canonical" href="https://www.oldpapergallery.com/Search/Boutique" />
                    </Helmet>

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
                            <br /><br />
                            <button className="buttonScrollClass" onClick={ () => this.ScrollFunction() }>RETOUR<br/>Haut de page</button>
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

