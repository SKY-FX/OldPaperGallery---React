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
        // console.log("path", path);
    }

    render () {
        var search = this.state.searchText;
        if (search === '') search = ' ';

        const items = [
            {
                path: '/Search/' + search + '/Litterature',
                text: 'Litterature'
            },
            {
                path: '/Search/' + search + '/Arts',
                text: 'Arts'
            },
            {
                path: '/Search/' + search + '/Histoire',
                text: 'Histoire'
            },
            {
                path: '/Search/' + search + '/Sciences',
                text: 'Sciences'
            },
            {
                path: '/Search/' + search + '/Politique',
                text: 'Politique'
            },
            {
                path: '/Search/ /',
                text: 'Toute la boutique'
            }
        ];

        return (
            <div className="navBar">
                {items.map(item => (
                    <Link to={item.path} key={item.path} onClick={(item) => this.handleClick(item.path)} className="item" title={item.text}><h2>{item.text}</h2></Link>
                ))}
            </div>
        )
    }
}

export default withRouter(navBarDetails);











