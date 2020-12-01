import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import './annonce.css'


class annonce extends Component {

    render() {
      
        const etatAnnonce = this.props.params[6];
        const ref = this.props.params[5];
        const nomImage = this.props.params[4];
        const idImage = this.props.params[3];
        const auteur = this.props.params[2];
        const prix = this.props.params[1];
        const titre = this.props.params[0];
        const annonceVendu = etatAnnonce.indexOf("vendu");
        
        // cherche l'image dans public/ressources
        // Pas besoin de mettre "./" car "ressources" est situé dans le dossier "public"
        const basePathPic = "/ressources/";
        const picPath = basePathPic.concat(nomImage);
        
        const pathVisu = "/GestionAnnonces/Visualiser/" + idImage;
        const pathModif = "/GestionAnnonces/Modifier/" + idImage;
        const pathEfface = "/GestionAnnonces/Effacer/" + idImage;

        return (
            <div className="annonce">

                <div className="scanAnnonce">
                    <a className="scanLink" href={picPath}>
                       <img src={picPath} width="150" alt="scan" />
                    </a>	
                </div>
            
                <div className="infoAnnonce">

                    {/* Affiche VENDU si l'annonce est vendu*/}
                    {annonceVendu===0 && 
                        <Fragment>
                            <p>VENDU</p>
                            <hr/>
                            <br/><br/>
                        </Fragment>
                    }
    
                    <h1>{auteur}</h1>
                    <hr/>
                    <br/>
                    <h2>{titre}</h2>
                    <hr/>
                    <br/>
                    <h2>référence : {ref}</h2>
                    <hr/>
                    <br/>
                    <h1>{prix} euros</h1>

                </div>

                
                <div className="toAnnonce">
                    <Link className="visuAnnonce" to={pathVisu}>
                        Visualiser 
                    </Link>

                    <Link className="visuAnnonce" to={pathModif}>
                        Modifier 
                    </Link>

                    <Link className="visuAnnonce" to={pathEfface}>
                        Effacer
                    </Link>
                    
                
                </div>
            </div> 
        )
    }
}

export default annonce;