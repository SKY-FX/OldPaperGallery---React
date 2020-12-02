import React, { Component, Fragment } from 'react'
import axios from 'axios'

export default class searchfunc extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            searchText : this.props.searchText,
            axiosUrl : this.props.axiosUrl
        }
        // console.log("SEARCH FUNCTION CONSTRUCTOR TEXT", this.props.searchText);
    }
    
    componentDidMount() {
        
        // console.log("SEARCH FUNCTION DID MOUNT TEXT",this.props.searchText);
        // En tete AXIOS + formatte la recherche pour axios
        // const url = "/api/search.php";
        const url = this.state.axiosUrl;
        var formData = new FormData();
        formData.append('searchText', this.state.searchText);

        // Fait appel à l'API PHP "SEARCH",  en paramètre "la recherche utilisateur"
        axios({
            method: 'post',
            url: url,
            data: formData
        })

        // Renvoie le résultat de la recherche ( objet de tableau ) au parent
        .then(response => {
            // console.log("SEARCH FUNCTION SEARCH", this.state.searchText);
            // console.log("SEARCH FUNCTION RESULTAT", response.data);
            // Renvoie le résultat de la recherche ( objet de tableau ) au parent
            this.props.return(response.data);
        })

        // Affiche l'erreur
        .catch(error => {
            console.log(error);
        }); 
    }

    render() {

        return (
            <Fragment />
        )
    }
}

