import React, { Component, Fragment } from 'react'
import axios from 'axios'

export default class visualiserAnnonce extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            idAnnonce : this.props.match.params.idAnnonce,
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
            // console.log("VISUALISER ANNONCE RESULTAT", response.data);

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
                img_portrait : result[22]
            });
        })
    
        // Affiche l'erreur
        .catch(error => {
            console.log(error);
        }); 
    }

    render() {
        const basePathPic = "/ressources/";
        
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
            return (
                (image) && (<a href={picPath} key={id} >
                    <img src={picPath} width="150" alt={image} />
                </a>)
            )
        });

        // console.log("IMAGES", this.props)

        return (
            
            <div className="visu_annonce">
                <div className="header_text" onClick={ () => this.props.history.goBack() } style={{color:"rgba(255,255,255,0.5)", cursor:"pointer", textDecoration:"none"}} >Retour</div>
           
                {/* <!-- SCAN --> */}
                <div className="sectionScan">
                    {afficheImages}

                    { (this.state.prix) ?
                        <Fragment>
                            <br/><br/>
                            <span>{this.state.prix} €</span>
                            <br/><br/>                          
                        </Fragment>:null
                    }

                    { (this.state.etat || this.state.dimension) ?
                            <fieldset>
                                <p>		
                                    { (this.state.etat) ?
                                        <Fragment>{this.state.etat}</Fragment>:null
                                    }
                                    <br/><br/>
                                    { (this.state.dimension) ?
                                        <Fragment>{this.state.dimension}</Fragment>:null
                                    }
                                </p>
                            </fieldset>:null
                    }
                </div>

                {/* <!-- DESCRIPTIF --> */}
                <div className="sectionDesc">

                    { (this.state.A_nom_prenom) ?
                        <Fragment><h1>{this.state.A_nom_prenom}</h1></Fragment>:null
                    }
                    
                    { (this.state.A_annees) ?
                        <Fragment><h5>{this.state.A_annees}</h5><br/></Fragment>:null
                    }

                    { (this.state.A_profession) ?
                        <Fragment><h5>{this.state.A_profession}</h5><br/><br/></Fragment>:null
                    }

                    { (this.state.A_biographie || this.state.img_portrait) ?
                        <Fragment>
                            <fieldset><legend>Biographie</legend>	
                                <div className="flexDiv">
                                    { (this.state.img_portrait) ? <img src={portraitPath} alt="scan" /> : null }
                                    { (this.state.A_biographie) ? <p>{this.state.A_biographie}</p> : null }
                                </div>
                            </fieldset>
                            <br/>
                            <br/>
                        </Fragment>:null
                    }
                   
                    { (this.state.D_nom_prenom) ?
                        <Fragment>
                            <h6>Document adressé à</h6><hr/><br/>
                            <h1>{this.state.D_nom_prenom}</h1>
                            { (this.state.D_annees) ? 
                                <Fragment>
                                    <h5>{this.state.D_annees}</h5>
                                    <br/>
                                    { (this.state.D_profession) ? 
                                        <Fragment>
                                             <h4>{this.state.D_profession}</h4>
                                             <br/><hr/>
                                        </Fragment>:null
                                    }
                                </Fragment>:null
                            }
                        </Fragment>:null
                    }

                    { (this.state.titre) ?
                        <Fragment><br/><br/><h6><i>{this.state.titre}</i></h6></Fragment>:null
                    }

                    { (this.state.notice) ?
                        <Fragment>
                            <fieldset><legend>Notice</legend>
                                <p>{this.state.notice}</p>
                            </fieldset>     
                        </Fragment>:null
                    }
                </div>
            </div>
        )
    }
}
