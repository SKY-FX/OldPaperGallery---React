import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import './annonce.css'


class annonce extends Component {

    constructor (props) {
        super(props);
        this.state = {
            etatAnnonce : props.params[6],
            ref : props.params[5],
            nomImage : props.params[4],
            idImage : props.params[3],
            auteur : props.params[2],
            prix : props.params[1],
            titre : props.params[0]
        }
    }

    render() {
      
        const annonceVendu = this.state.etatAnnonce.indexOf("vendu");
        
        // cherche l'image dans public/ressources
        // Pas besoin de mettre "./" car "ressources" est situé dans le dossier "public"
        // const basePathPic = "/ressources/";
		const basePathPic = "/uploadPics/" + this.state.ref + "/";
        const picPath = basePathPic.concat(this.state.nomImage);
        
        const idAnnonce = "/GestionAnnonces/Visualiser/" + this.state.idImage;
        const pathEfface = "/GestionAnnonces/AcheterAnnonce/" + this.state.auteur + "/" + this.state.titre + "/" + this.state.prix + "/";
        
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
                        <p>VENDU<br/><br/></p>
                    }
    
                    <h1>{this.state.auteur}</h1>
                    <br/>
                    <h2>{this.state.titre}</h2>
                    <br/>
                    <h1>{this.state.prix} euros</h1>

                </div>

                
                    <div className="toAnnonce">
                        
                        <Link className="visuAnnonce" to={idAnnonce} style={{color:"white"}}>
                            Visualiser 
                        </Link>
                          
                        {/* Affiche ACHETER si l'annonce n'est pas vendu*/}
                        {annonceVendu!==0 && 
                            <Fragment>
                                {/* Et si elle n'est pas en cours d'être acheté */}
                                { this.props.isSold === "true" ?
                                    <Link className="acheterAnnonce" to={pathEfface} style={{color:"white"}}>
                                        Acheter
                                    </Link>
                                    :
                                    null
                                }
                            </Fragment>

                        }
                    </div>
                    
            </div> 
        )
    }
}

export default annonce;