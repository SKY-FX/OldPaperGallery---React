import React, {Fragment} from 'react'
import './navBar.css'
import { Helmet } from "react-helmet"
import {Link, withRouter} from 'react-router-dom'
import ButtonBar from './buttonBar'

// const items = [
//     {
//         path: '/Search/Autographe',
//         text: 'Autographes'
//     },
//     {
//         path: '/Search/Manuscrit',
//         text: 'Manuscrits'
//     },
//     {
//         path: '/Search/Gravure',
//         text: 'Gravures'
//     },
//     {
//         path: '/Search/Dessin',
//         text: 'Dessins'
//     },
//     {
//         path: '/SearchAuteurs',
//         text: 'Auteurs'
//     }
// ];

function navBar(props) {

    function handleClick(path) {
        props.history.push(path);
    }

    return (
        <Fragment>

            <Helmet>
                <meta charSet="utf-8" />
                <meta name="author" content="Chabaud Sylvain - web developer"></meta>
                <title>Autographes - manuscrits - gravures : Old Paper Gallery</title>
                <meta name="description" content="Nous achetons et vendons des lettres autographes, manuscrits, gravures et documents anciens"/>
                <link rel="canonical" href="https://www.oldpapergallery.com/" />
            </Helmet>

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

                {/* <div className="navBar">   
                    {items.map(item => (
                        <Link className="item" to={item.path} key={item.path} onClick={handleClick.bind(null, item.path)} title={item.text}><h2>{item.text}</h2></Link>
                        ))}
                </div> */}
                <ButtonBar />
            </div>
        </Fragment>
    )
}

export default withRouter(navBar);