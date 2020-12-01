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


{/* <Link to="Autographe" className="item" title="Lettre autographe">Lettre autographe</Link>
<Link to="Plaquette" className="item" title="Plaquettes">Plaquettes</Link>
<Link to="Manuscrit" className="item" title="Manuscrit">Manuscrit</Link>
<Link to="Gravure" className="item" title="Gravures">Gravures</Link>
<Link to="Art" className="item" title="Oeuvres d'art">Oeuvres d'art</Link>
<Link to="Auteur" className="item" title="Liste des auteurs">Auteurs</Link> */}
