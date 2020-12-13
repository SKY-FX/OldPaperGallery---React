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
                    Ma passion pour les autographes, manuscrits, vieux papiers et gravures, a débuté il y a
                    environ 50 ans. Parmi eux des personnalités historiques, des écrivains, des acteurs de
                    théâtre ou de cinéma, des peintres, des musiciens…
                    {/* <br/><br/> */}
                    Nous avons plus de quinze mille
                    pièces à la vente, que vous trouverez pour certaines sur ce site ou celui de notre boutique
                    Ebay. D’autres ne sont pas encore en ligne Que ce soient de grands noms, de très belles
                    lettres ou documents riches d’histoire ou encore de personnalités moins connues, nous
                    essayerons de satisfaire votre recherche. 
                    {/* <br/><br/> */}
                    Quelqu’en soit l’auteur, n’hésitez pas à nous
                    contacter. Contactez nous également si vous souhaitez par ailleurs, vendre un ou
                    plusieurs documents, une archive, une collection, une succession. Nous vous ferons une
                    proposition d’achat (tous nos paiements se font comptant). 
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