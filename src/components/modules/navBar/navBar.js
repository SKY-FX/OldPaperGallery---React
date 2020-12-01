import React, {Fragment} from 'react'
import './navBar.css'
import {Link, withRouter} from 'react-router-dom'

const items = [
    {
        path: '/Search/Autographe',
        text: 'Autographe'
    },
    {
        path: '/Search/Plaquette',
        text: 'Plaquette'
    },
    {
        path: '/Search/Manuscrit',
        text: 'Manuscrit'
    },
    {
        path: '/Search/Gravure',
        text: 'Gravure'
    },
    {
        path: '/Search/Art',
        text: 'Art'
    },
    {
        path: '/SearchAuteurs',
        text: 'Auteurs'
    }
];

function navBar(props) {

    function handleClick(path) {
        props.history.push(path);
    }

    return (
        <Fragment>
            <p className="mainText" >Achète lettres autographes, collections de lettres ou de documents et archives. <br/> Nous faisons des estimations. Paiement comptant.</p>
            
            <div className="navBar">   
                {items.map(item => (
                    <Link className="item" to={item.path} key={item.path} onClick={handleClick.bind(null, item.path)} title={item.text}>{item.text}</Link>
                    ))}
                
            </div>
        </Fragment>
    )
}

export default withRouter(navBar);