import React, {Fragment} from 'react'
import './navBar.css'
import {Link, withRouter} from 'react-router-dom'

const items = [
    {
        path: '/Search/Autographe',
        text: 'Autographes'
    },
    {
        path: '/Search/Manuscrit',
        text: 'Manuscrits'
    },
    {
        path: '/Search/Gravure',
        text: 'Gravures'
    },
    {
        path: '/Search/Dessin',
        text: 'Dessins'
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

            {/* <div className="navBar">   
                {items.map(item => (
                    <Link className="item" to={item.path} key={item.path} onClick={handleClick.bind(null, item.path)} title={item.text}><h2>{item.text}</h2></Link>
                    ))}
            </div> */}
            
            <div className="mainText">
                <h1 >
                    ACHATS - VENTES
                </h1>

                <br/>
                
                {/* <h2>
                    Autographes - Manuscrits - Archives - Gravures
                </h2> */}

                <h3>
                    <p className="letrine">N</p>
                    ous achetons et vendons des lettres autographes, manuscrits, gravures, archives et documents anciens.<br/>
                    Nous faisons des estimations. Paiement comptant.
                </h3>

                <div className="navBar">   
                    {items.map(item => (
                        <Link className="item" to={item.path} key={item.path} onClick={handleClick.bind(null, item.path)} title={item.text}><h2>{item.text}</h2></Link>
                        ))}
                </div>
            </div>
        </Fragment>
    )
}

export default withRouter(navBar);