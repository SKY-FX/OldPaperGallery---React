import React, { Component } from 'react'
import './searchBar.css'


class searchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText : '',
            nbResult : 0,
            Presence : ''            
        };
        // console.log("searchBar :", this.props.searchText);
    }


    // Quand le boutton de recherche est cliqué
    onClick = (event) => {
        event.preventDefault(); 
        // console.log("searchBar onClick",this.state.searchText);
        const text = this.state.searchText;
        if (text === '') {this.props.return(" ");}
        else {this.props.return(this.state.searchText);}
    
    }

    // Quand le texte de la barre de recherche change
    handleChange = (event) => {
        this.setState({
            searchText : event.target.value
        });
    }

    
    render() {

        return (
            <div className="searchBar">
                <form className = "searchForm" onSubmit={this.onClick}>
                    <input className="searchInput" type="text" rows="15" cols="2" name={this.state.searchText} onChange={this.handleChange} placeholder="Recherche ..."/> 
                    <button className="searchButton" type="submit" title="Cliquez pour lancer la recherche">Recherche</button>
                </form>

                <br/>

                { (this.state.Presence !=='') && (
                    <p className="infoSearchResult">Il y a {this.state.nbResult} annonce(s) trouvée(s)</p>
                )}
            </div>
        )
    }
}

export default searchBar;