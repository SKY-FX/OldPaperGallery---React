import React, {Fragment} from 'react'
import './navBar.css'
import {Link, withRouter} from 'react-router-dom'

const items = [
    {
        path: '/Search/Autographe',
        text: 'Autographes'
    },
    // {
    //     path: '/Search/Plaquette',
    //     text: 'Plaquette'
    // },
    {
        path: '/Search/Manuscrit',
        text: 'Manuscrits'
    },
    {
        path: '/Search/Gravure',
        text: 'Gravures'
    },
    // {
    //     path: '/Search/Art',
    //     text: 'Art'
    // },
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
            <div className="mainText">
                <h1 >
                    ACHATS - VENTES
                </h1>

                <br/>
                
                <h2>
                    Autographes - Manuscrits - Archives - Gravures
                </h2>

                <br/>
                <br/>

                <h3>
                    Nous achetons et vendons des lettres autographes, manuscrits, gravures, archives et documents anciens.<br/>
                    Nous faisons des estimations. Paiement comptant.
                </h3>


            </div>
            
            <div className="navBar">   
                {items.map(item => (
                    <Link className="item" to={item.path} key={item.path} onClick={handleClick.bind(null, item.path)} title={item.text}><h2>{item.text}</h2></Link>
                    ))}
                
            </div>
        </Fragment>
    )
}

export default withRouter(navBar);