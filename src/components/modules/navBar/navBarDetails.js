import React, {Component} from 'react'
import './navBar.css'
import {Link, withRouter} from 'react-router-dom'



class navBarDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText : this.props.searchText
        }
    }

    handleClick = (path) => {
        this.props.history.push(path);
    }

    render () {

        const items = [
            {
                path: '/Search/' + this.state.searchText + '/Litterature',
                text: 'Litterature'
            },
            {
                path: '/Search/' + this.state.searchText + '/Arts',
                text: 'Arts'
            },
            {
                path: '/Search/' + this.state.searchText + '/Histoire',
                text: 'Histoire'
            },
            {
                path: '/Search/' + this.state.searchText + '/Sciences',
                text: 'Sciences'
            },
            {
                path: '/Search/' + this.state.searchText + '/Politique',
                text: 'Politique'
            },
            {
                path: '/Search/Boutique/Tout',
                text: 'Toute la boutique'
            }
        ];

        return (
            <div className="navBar">
                {items.map(item => (
                    <Link to={item.path} key={item.path} onClick={(item) => this.handleClick(item.path)} className="item" title={item.text}>{item.text}</Link>
                ))}
            </div>
        )
    }
}

export default withRouter(navBarDetails);











