import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class visualiserAnnonce extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            idAnnonce : this.props.match.params.idAnnonce,
            notice : '',
            A_biographie : '',
            infos : '',
            titre : ''
        }
    }

    componentDidMount()
    {
        const url = "/api/readAnnonce.php";
        // const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/readAnnonce.php";
        
        const id = this.state.idAnnonce;

        // En tete AXIOS + formatte la recherche pour axios
        var formData = new FormData();
        formData.append('id', id);
    
        // Fait appel à l'API PHP "SEARCH",  en paramètre "la recherche utilisateur"
        axios({
            method: 'post',
            url: url,
            data: formData
        })
    
        // Renvoie le résultat de la recherche ( objet de tableau ) au parent
        .then(response => {
            // console.log("VISUALISER ANNONCE", this.state.idAnnonce);
            console.log("VISUALISER ANNONCE RESULTAT", response.data);

            const result = response.data;

            this.setState({
                // result : result,
                reference : result[23],
                titre : result[5],
                type_doc : result[21],
                discipline : result[6],
                A_nom_prenom : result[13],
                A_profession : result[14],
                A_annees : result[15],
                A_lieu : result[16],
                A_biographie : result[12],
                D_nom_prenom : result[17],
                D_profession :result[18],
                D_annees : result[19],
                D_lieu : result[20],
                etat : result[8],
                dimension : result[11],
                notice : result[9],
                infos : result[10],
                prix : result[7],
                img_nom1 : result[0],
                img_nom2 : result[1],
                img_nom3 : result[2],
                img_nom4 : result[3],
                img_nom5 : result[4],
                img_portrait : result[22],
                certificat : result[24],
                etat_annonce : result[25]
            });
        })
    
        // Affiche l'erreur
        .catch(error => {
            console.log(error);
        }); 
    }



    render() {
        const pathAchat = "/GestionAnnonces/AcheterAnnonce/" + this.state.A_nom_prenom + "/" + this.state.titre + "/" + this.state.prix + "/";
        const etatAnnonce = this.state.etat_annonce;
        let annonceVendu;
        if (etatAnnonce) annonceVendu = etatAnnonce.indexOf("vendu");
        console.log("COUCOU : ", etatAnnonce);
        // const basePathPic = "/ressources/";
        const basePathPic = "/uploadPics/" + this.state.reference + "/";
        
        const portraitPath = basePathPic.concat(this.state.img_portrait);

        const images = [
            this.state.img_nom1,
            this.state.img_nom2,
            this.state.img_nom3,
            this.state.img_nom4,
            this.state.img_nom5,
        ]

        const afficheImages = images.map( (image, id) => {
            const picPath = basePathPic.concat(image);
            const divStyle = {
                zIndex : 999-id
            }
            return (
                (image) && (<a href={picPath} key={id} style={divStyle}>
                    <img src={picPath} width="150" alt={image}/>
                </a>)
            )
        });

        // Conversion html <br /> en saut de ligne pour la notice
        const notice = this.state.notice.replace(/<br \/>/g, "<br/>");

        // Conversion html <br /> en saut de ligne pour la biographie de l'auteur
        const A_biographie = this.state.A_biographie.replace(/<br \/>/g, "<br/>");

        // Conversion html <br /> en saut de ligne pour les informations du vendeur
        // const infos = this.state.infos.replace(/<br \/>/g, "<br/>");

        // Conversion html <br /> en saut de ligne pour le titre de l'annonce
        const titre = this.state.titre.replace(/<br \/>/g, "<br/>");

        
        return (
            
            <div className="visu_annonce">
                <div className="header_text" onClick={ () => this.props.history.goBack() } style={{cursor:"pointer", textDecoration:"none"}} >Retour</div>
           
                {/* <!-- SCAN --> */}
                <div className="sectionScan">
                    {afficheImages}               

                    { (this.state.etat || this.state.dimension) ?
                        <fieldset>
                            <div className="pBody">		
                                { (this.state.etat) ?
                                    <Fragment>{this.state.etat}</Fragment>:null
                                }
                                { (this.state.dimension) ?
                                    <Fragment><br/><br/>{this.state.dimension}</Fragment>:null
                                }
                            </div>
                        </fieldset>:null
                    }

                    { (this.state.certificat === 'Oui') ?
                        <Fragment>
                            <br/><br/>   
                            <div className="pHead">Vendu avec Certificat d'authencité</div>
                                                   
                        </Fragment>:null
                    }

                    { (this.state.prix) ?
                        <Fragment>
                            <br/><br/>
                            <div className="pHead">{this.state.prix} €</div>                     
                        </Fragment>:null
                    }

                    { annonceVendu!==0 &&
                        <Fragment>
                            <br/><br/>
                            <Link className="acheterAnnonceVisu" to={pathAchat} >
                                Acheter
                            </Link>
                        </Fragment>
                    }
                    
                </div>

                {/* <!-- DESCRIPTIF --> */}
                <div className="sectionDesc">

                    { (this.state.A_nom_prenom) ?
                        <h1 className="pHHead">{this.state.A_nom_prenom}</h1>:null
                    }
                    
                    { (this.state.A_annees) ?
                        <Fragment><div className='annee'>{this.state.A_annees}</div><br/></Fragment>:null
                    }

                    { (this.state.A_profession) ?
                        <Fragment><p>{this.state.A_profession}</p><br/><br/></Fragment>:null
                    }

                    { (this.state.A_biographie || this.state.img_portrait) ?
                        <Fragment>
                            <fieldset><legend>Biographie</legend>	
                                <div className="flexDiv">
                                    { (this.state.img_portrait) ? <a href={portraitPath} ><img src={portraitPath} alt={this.state.img_portrait} /></a> : null }
                                    { (this.state.A_biographie) ? <div className="pBBody" dangerouslySetInnerHTML={{ __html: A_biographie }} /> : null }
                                </div>
                            </fieldset>
                            <br/>
                            <br/>
                        </Fragment>:null
                    }
                   
                    { (this.state.D_nom_prenom) ?
                        <Fragment>
                            <p>Document adressé à</p><hr/><br/>
                            <div className="pHHead">{this.state.D_nom_prenom}</div>
                            { (this.state.D_annees) ? 
                                <Fragment>
                                    <p>{this.state.D_annees}</p>
                                    <br/>
                                    { (this.state.D_profession) ? 
                                        <Fragment>
                                             <p>{this.state.D_profession}</p>
                                             <br/><hr/>
                                        </Fragment>:null
                                    }
                                </Fragment>:null
                            }
                        </Fragment>:null
                    }

                    { (this.state.titre) ?
                        <Fragment><br/><br/><br/><p dangerouslySetInnerHTML={{ __html: titre }} /><br/></Fragment>:null
                    }

                    { (this.state.notice) ?
                        <Fragment>
                            <fieldset><legend>Notice</legend>
                                <div className="pBBody" dangerouslySetInnerHTML={{ __html: notice }} />
                            </fieldset>     
                        </Fragment>:null
                    }
                </div>
            </div>
        )
    }
}
