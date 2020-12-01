import React, { Component, Fragment } from 'react'
// import SearchBar from '../components/modules/searchBar/searchBar'
import NavBarDetails from '../components/modules/navBar/navBarDetails'
import ListeAnnonce from '../components/modules/listeAnnonce/listeAnnonce'
import SearchFunc from '../components/modules/searchFunction/searchfunc'

export default class listeRecherche extends Component {

    constructor (props) {
        super(props);
        this.state = {
            searchResult : [],
            searchText : props.match.params.searchText,
            validFlag : '0'
        };
        // console.log("MAIN : ", this.state.searchText);
    }

    searchResult = (result) => {
        // console.log("MAIN : ", result);
        this.setState({
            searchResult : result,
            validFlag : result.titre[0]
        });
    }

    render() {
        const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/search.php";
        
        return (
            
            <Fragment>
                {  this.state.validFlag !== '' ?
                    <div className="listeRecherche">
                        <NavBarDetails searchText={this.state.searchText} />
                        
                        <SearchFunc searchText={this.state.searchText} axiosUrl={url} return={ (result) => this.searchResult(result) } />
                        <ListeAnnonce liste={this.state.searchResult} isSold="true" /> 
                    </div>
                    :
                    null
                }
            </Fragment>
        )
    }
}
