import React, { Component, Fragment } from 'react'
import { Helmet } from "react-helmet"
import axios from 'axios'

import UserProfile from '../utiles/sessionFct'

import './gestionAnnonce.css'

export default class modifierAnnonce extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            idAnnonce : this.props.match.params.idAnnonce,
            userName : '',
            portraitIsChange : false,
            imagesIsChange : false,
            A_biographie : '',
            infos : '',
            notice : '',
            titre : '',
            reference : '',
            certificat : '',
            newReference : ''
        }
        this.fileInput = React.createRef();
    }

    componentDidMount()
    {

        var elmnt = document.getElementById("scrollInto");
        elmnt.scrollIntoView();

        const userName = UserProfile.getName();
        this.setState({
            userName : userName
        })

        // const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/readAnnonce.php";
        const url = "/api/readAnnonce.php";
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
            // console.log("READ ANNONCE", this.state.idAnnonce);
            console.log("READ ANNONCE RESULTAT", response.data);

            const result = response.data;

            this.setState({
                reference : result[23],
                newReference : result[23],
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
                img_file1 : '',
                img_file2 : '',
                img_file3 : '',
                img_file4 : '',
                img_file5 : '',
                portrait_file : '',
                certificat : result[24]
            });
        })
    
        // Affiche l'erreur
        .catch(error => {
            console.log(error);
        }); 
    }

    onModifierAnnonce = (e) => {
        e.preventDefault();

        const url = "/api/modifierAnnonce.php";
        // const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/modifierAnnonce.php";

        // En tete AXIOS + formatte la recherche pour axios
        var formData = new FormData();
        formData.append('id', this.state.idAnnonce);
        formData.append('reference', this.state.reference);
        formData.append('newReference', this.state.newReference);
        formData.append('titre', this.state.titre);
        formData.append('type_doc', this.state.type_doc);
        formData.append('discipline', this.state.discipline);
        formData.append('A_nom_prenom', this.state.A_nom_prenom);
        formData.append('A_profession', this.state.A_profession);
        formData.append('A_annees', this.state.A_annees);
        formData.append('A_lieu', this.state.A_lieu);
        formData.append('A_biographie', this.state.A_biographie);
        formData.append('D_nom_prenom', this.state.D_nom_prenom);
        formData.append('D_profession', this.state.D_profession);
        formData.append('D_annees', this.state.D_annees);
        formData.append('D_lieu', this.state.D_lieu);
        formData.append('etat', this.state.etat);
        formData.append('dimension', this.state.dimension);
        formData.append('notice', this.state.notice);
        formData.append('infos', this.state.infos);
        formData.append('prix', this.state.prix);

        formData.append('img_file1', this.state.img_file1);
        formData.append('img_file2', this.state.img_file2);
        formData.append('img_file3', this.state.img_file3);
        formData.append('img_file4', this.state.img_file4);
        formData.append('img_file5', this.state.img_file5);
        formData.append('portrait_file', this.state.portrait_file);

        formData.append('img_nom1', this.state.img_nom1);
        formData.append('img_nom2', this.state.img_nom2);
        formData.append('img_nom3', this.state.img_nom3);
        formData.append('img_nom4', this.state.img_nom4);
        formData.append('img_nom5', this.state.img_nom5);
        formData.append('img_portrait', this.state.img_portrait);

        formData.append('portraitIsChange', this.state.portraitIsChange);
        formData.append('imagesIsChange', this.state.imagesIsChange);

        formData.append('certificat', this.state.certificat);
    
        

        // Fait appel à l'API PHP "SEARCH",  en paramètre "la recherche utilisateur"
        axios({
            method: 'post',
            url: url,
            data: formData
        })
    
        // Renvoie le résultat de la recherche ( objet de tableau ) au parent
        .then(response => {
            // console.log("MODIFIER ANNONCE RESULTAT", response.data);

            this.props.history.push('/GestionAnnonces/');
        })
    
        // Affiche l'erreur
        .catch(error => {
            console.log(error);
        }); 
    }


    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        // console.log("TOTO", value)
        this.setState({
            [name] : value
        });
    }

    onChangePortrait = (event) => {
        const filesTab = event.target.files;
        const nbFiles =  filesTab.length;

        if (nbFiles>0) 
        {

            this.setState({
                portrait_file : event.target.files[0],
                portraitIsChange : true
            })
        }
       
    }

    onChangeImages = (event) => {

        const filesTab = event.target.files;
        const nbFiles =  filesTab.length;

        if (nbFiles<=5)
        {
            for (var ii=1; ii<=nbFiles; ii++)
            {
                const nameFile = "img_file" + ii;
                this.setState({
                    [nameFile] : event.target.files[ii-1],
                    imagesIsChange : true
                });
            }
        }   
        else{
            window.alert("Vous pouvez télécharher au maximum 5 images !")
        }  
    }


    render() {

        // const basePathPic = "/ressources/";
		const basePathPic = "/uploadPics/" + this.state.reference + "/";
        const portraitPath = basePathPic.concat(this.state.img_portrait);
        // console.log('PORTRAIT : ', portraitPath);

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
                (image) && (
                    <img key={id} src={picPath} width="70" alt={image} />
                )
            )
        });

        // Conversion html <br /> en saut de ligne pour la notice
        const notice = this.state.notice.replace(/<br \/>/g, "\n");

        // Conversion html <br /> en saut de ligne pour la biographie de l'auteur
        const A_biographie = this.state.A_biographie.replace(/<br \/>/g, "\n");

        // Conversion html <br /> en saut de ligne pour les informations du vendeur
        const infos = this.state.infos.replace(/<br \/>/g, "\n");

        // Conversion html <br /> en saut de ligne pour le titre de l'annonce
        const titre = this.state.titre.replace(/<br \/>/g, "\n");
        // console.log("TITRE : ", titre)
        return (
            <div id="scrollInto">
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="author" content="Chabaud Sylvain - web developer"></meta>
                    <title>Autographes - manuscrits - gravures : Old Paper Gallery</title>
                    <meta name="description" content="Nous achetons et vendons des lettres autographes, manuscrits, gravures et documents anciens"/>
                    <link rel="canonical" href="https://www.oldpapergallery.com/GestionAnnonces" />
                </Helmet>

                <div className="header_text" onClick={ () => this.props.history.goBack() } style={{cursor:"pointer", textDecoration:"none"}} >Retour</div>
    
                { this.state.userName !== '' ?
                    <div className="detailsAnnonceForm">
                    
                        <p>Modifier l'annonce n° {this.state.idAnnonce}</p>
                        <br/>
                        <br/>

                        <fieldset><legend>REFERENCE</legend>
                            <textarea name="newReference" value={this.state.newReference} rows="1" cols="50" placeholder="Référence" onChange={this.onChange} ></textarea>
                        </fieldset>	
                    
                        <fieldset><legend>CERTIFICAT D'AUTHENTICITE</legend>
                            <select name="certificat" value={this.state.certificat} rows="1"  onChange={this.onChange} >
                                <option value="">{this.state.certificat}</option>
                                <option value="Oui">Oui</option>
                                <option value="Non">Non</option>
                            </select>
                        </fieldset>	

                        <fieldset><legend>TITRE</legend>
                            <textarea name="titre" value={titre} rows="3" cols="50" placeholder="Titre" onChange={this.onChange}></textarea>
                        </fieldset>	
                        
                        <fieldset><legend>TYPE DE DOCUMENT</legend>
                            <select name="type_doc" onChange={this.onChange} >
                                <option value="">{this.state.type_doc}</option>
                                <option value="Lettre autographe">Lettre autographe</option>
                                {/* <option value="Plaquette">Plaquette</option> */}
                                <option value="Manuscrit">Manuscrit</option>
                                <option value="Gravure">Gravure</option>
                            </select>
                        </fieldset>

                        <fieldset><legend>DISCIPLINE</legend>
                            <select name="discipline" onChange={this.onChange}>
                                <option value="">{this.state.discipline}</option>
                                <option value="Littérature">Littérature</option>
                                <option value="Arts">Arts</option>
                                <option value="Sciences">Sciences</option>
                                <option value="Politique">Politique</option>
                                <option value="Histoire">Histoire</option>
                            </select>
                        </fieldset>

                        <fieldset><legend>IDENTITE DE L'AUTEUR</legend>
                            <textarea name="A_nom_prenom" onChange={this.onChange} value={this.state.A_nom_prenom} rows="1" cols="50" placeholder="Nom Prénom"></textarea><br/>
                            <textarea name="A_profession" onChange={this.onChange} value={this.state.A_profession} rows="1" cols="50" placeholder="Profession"></textarea><br/>
                            <textarea name="A_annees" onChange={this.onChange} value={this.state.A_annees} rows="1" cols="50" placeholder="Date de naissance et de décès"></textarea><br/>
                            <textarea name="A_lieu" onChange={this.onChange} value={this.state.A_lieu} rows="1" cols="50" placeholder="Lieu de naissance et de décès"></textarea><br/>
                            <textarea name="A_biographie" onChange={this.onChange} value={A_biographie} rows="3" cols="50" placeholder="Biographie"></textarea><br/>
                        </fieldset>

                        <fieldset><legend>IDENTITE DU DESTINATAIRE</legend>
                            <textarea name="D_nom_prenom" onChange={this.onChange} value={this.state.D_nom_prenom} rows="1" cols="50" placeholder="Nom Prénom" ></textarea><br/>
                            <textarea name="D_profession" onChange={this.onChange} value={this.state.D_profession} rows="1" cols="50" placeholder="Profession" ></textarea><br/>
                            <textarea name="D_annees" onChange={this.onChange} value={this.state.D_annees} rows="1" cols="50" placeholder="Date de naissance et de décès" ></textarea><br/>
                            <textarea name="D_lieu" onChange={this.onChange} value={this.state.D_lieu} rows="1" cols="50" placeholder="Lieu de naissance et de décès" ></textarea><br/>
                        </fieldset>

                        <fieldset><legend>ETAT</legend>
                            <textarea name="etat" onChange={this.onChange} value={this.state.etat} rows="1" cols="50" placeholder="Etat" ></textarea>
                        </fieldset>
                                
                        <fieldset><legend>DIMENSION</legend>
                            <textarea name="dimension" onChange={this.onChange} value={this.state.dimension} rows="1" cols="50" placeholder="Dimension" ></textarea>
                        </fieldset>
                            
                        <fieldset><legend>NOTICE</legend>					
                            <textarea name="notice" onChange={this.onChange} value={notice} rows="3" cols="50" placeholder="Notice" ></textarea>
                        </fieldset>
                            
                        <fieldset><legend>INFORMATIONS SUR LE VENDEUR</legend>	
                            <textarea name="infos" onChange={this.onChange} value={infos} rows="3" cols="50" placeholder="Infos" ></textarea>
                        </fieldset>
                                
                        <fieldset><legend>CHOISIR LES IMAGES</legend>
                            <input type="hidden" name="MAX_FILE_SIZE" value="10000000" />
                            
                            <Fragment>
                                
                                <label htmlFor="img_scan">Scans (5 max)<br/></label>
                                <div id="img_scan">
                                    <input type="file" name="fic[]" size="40" multiple accept="image/png, image/jpeg" onChange={this.onChangeImages} />
                                </div>
                                
                                <div>
                                    <br/>
                                    {afficheImages}
                                </div>

                            </Fragment>

                            <Fragment>
                                <br/>
                                
                                <label htmlFor="img_portrait">Portrait (1 max)<br/></label>
                                <div id="img_portrait" >
                                    <input type="file" name="fic_portrait" size="40" accept="image/png, image/jpeg" onChange={this.onChangePortrait} />
                                </div>
                                
                                <Fragment>
                                    <br/>
                                    <img src={portraitPath} width="70" alt={this.state.img_portrait} />
                                </Fragment>

                            </Fragment>
                            
                        </fieldset>	

                        <fieldset><legend>PRIX (€)</legend>	
                            <textarea name="prix" onChange={this.onChange} value={this.state.prix} rows="1" placeholder="Prix"></textarea>
                        </fieldset>
                        
                        <fieldset><legend>MODIFIER L'ANNONCE</legend>	
                            <button className="searchButton" onClick={this.onModifierAnnonce} title="Modifier l'annonce">Modifier</button>
                        </fieldset>	
                        
                        <input type="hidden" name="id" value={this.state.idAnnonce} />
                    </div>
                    :
                    <div className="textConnexion">
                        Vous devez être connecté pour accéder à l'espace privé !
                    </div>
                }
            </div>
                   
        )
    }
}
