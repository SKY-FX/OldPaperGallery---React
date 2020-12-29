import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import './annonce.css'


class annonce extends Component {

    // constructor (props) {
    //     super(props);
    //     // console.log('ANNONCE : ', props.params);
    // }

    render() {
        const profession = this.props.params[7];
        const etatAnnonce = this.props.params[6];
        const ref = this.props.params[5];
        const nomImage = this.props.params[4];
        const idImage = this.props.params[3];
        const auteur = this.props.params[2];
        const prix = this.props.params[1];
        const titre = this.props.params[0];
        const isSold = this.props.isSold;

        const annonceVendu = etatAnnonce.indexOf("vendu");
        
        // cherche l'image dans public/ressources
        // Pas besoin de mettre "./" car "ressources" est situé dans le dossier "public"
        // const basePathPic = "/ressources/";
		const basePathPic = "/uploadPics/" + ref + "/";
        const picPath = basePathPic.concat(nomImage);
        
        const idAnnonce = "/GestionAnnonces/Visualiser/" + idImage;
        const pathEfface = "/GestionAnnonces/AcheterAnnonce/" + auteur + "/" + titre + "/" + prix + "/";
        
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
                        <p className="pVendu">VENDU<br/><br/></p>
                    }
    
            
                    <div className="pHead">{auteur}</div>
                    <hr/>
                    <div className="pBody" dangerouslySetInnerHTML={{ __html: profession }} />
                    <br/>
                    <br/>
                    {/* <hr/> */}
                    <div className="pBody" dangerouslySetInnerHTML={{ __html: titre }} />                  
                    <hr/>
                    <br/>
                    <div className="pHead">{prix} euros</div>

                </div>

                
                    <div className="toAnnonce">
                        
                        <Link className="visuAnnonce" to={idAnnonce} style={{color:"white"}}>
                            Visualiser 
                        </Link>
                          
                        {/* Affiche ACHETER si l'annonce n'est pas vendu*/}
                        {annonceVendu!==0 && 
                            <Fragment>
                                {/* Et si elle n'est pas en cours d'être acheté */}
                                { isSold === "true" ?
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