import React, { Component, Fragment } from 'react'
import axios from 'axios'
import './gestionAnnonce.css'

import UserProfile from '../utiles/sessionFct'

export default class ajouterAnnonce extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            userName : '',
            reference : '',
            titre : '',
            type_doc : '',
            discipline : '',
            A_nom_prenom : '',
            A_profession : '',
            A_annees : '',
            A_lieu : '',
            A_biographie : '',
            D_nom_prenom : '',
            D_profession : '',
            D_annees : '',
            D_lieu : '',
            etat : '',
            dimension : '',
            notice : '',
            infos : '',
            prix : '',
            certificat : ''
        }
    }

    componentDidMount()
    {
        const userName = UserProfile.getName();
        
        this.setState({
            userName : userName
        })
    }

    onClick = (e) => {
        e.preventDefault();

        // console.log("TARGET", e.target);

        
        const url = "/api/ajouterAnnonce.php";
        // const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/ajouterAnnonce.php";
        
        // En tete AXIOS + formatte la recherche pour axios
        var formData = new FormData();
        formData.append('reference', this.state.reference);
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
        formData.append('certificat', this.state.certificat);

        // formData.append('img_file1', this.state.img_file1);
    
        // Fait appel à l'API PHP "SEARCH",  en paramètre "la recherche utilisateur"
        axios({
            method: 'post',
            url: url,
            data: formData
        })
    
        // Renvoie le résultat de la recherche ( objet de tableau ) au parent
        .then(response => {
            // console.log("AJOUTE ANNONCE RESULTAT", response.data);
            const result = response.data;

            if (result!==0) this.props.history.push('/GestionAnnonces/');
        })
    
        // Affiche l'erreur
        .catch(error => {
            console.log(error);
        }); 
    }


    onChange = (e) => {
        e.preventDefault() 

        const name = e.target.name;
        const value = e.target.value;
        // console.log("TOTO", e.target)
        this.setState({
            [name] : value
        });
    }

    onChangePortrait = (event) => {
        event.preventDefault() 

        const filesTab = event.target.files;
        const nbFiles =  filesTab.length;

        if (nbFiles) 
        {
            const name = event.target.files[0].name;
            const file = event.target.files[0];

            this.setState({
                img_portrait : name,
                portrait_file : file
            })
        }
       
    }

    onChangeImages = (event) => {
        // event.preventDefault();

        const filesTab = event.target.files;
        const nbFiles =  filesTab.length;

        if (nbFiles<=5)
        {
            for (var ii=1; ii<=nbFiles; ii++)
            {
                const fileName = filesTab[ii-1].name;
                const fileContents = filesTab[ii-1];
                const name = "img_nom" + ii;
                const file = "img_file" + ii;

                this.setState({
                    [name] : fileName,
                    [file] : fileContents
                });

                // console.log("COUCOU", fileContents)   
            }
            
        }   
        else{
            window.alert("Vous pouvez télécharher au maximum 5 images !")
        }  
    }

    render() {

        const basePathPic = "/uploadPics/" + this.state.reference + "/";
        // const basePathPic = "/ressources/";
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
                (image) && (
                    <img key={id} src={picPath} width="70" alt={image} />
                )
            )
        });
        
        return (
            
            <Fragment>
                <div className="header_text" onClick={ () => this.props.history.goBack() } style={{color:"red", cursor:"pointer", textDecoration:"none"}} >Retour</div>
    
                { this.state.userName !== '' ?
                    <div className="detailsAnnonceForm">
                        <p>Ajouter une annonce</p>
                        <br/>
                        <br/>

                        <form onSubmit={this.onClick} >
                            <fieldset><legend>REFERENCE</legend>
                                <textarea name="reference" value={this.state.reference} rows="1" cols="50" placeholder="Référence" onChange={this.onChange} ></textarea>
                            </fieldset>	

                            <fieldset><legend>CERTIFICAT D'AUTHENTICITE</legend>
                                <select name="certificat" onChange={this.onChange}>
                                    <option value="">{this.state.certificat}</option>
                                    <option value="Oui">Oui</option>
                                    <option value="Non">Non</option>
                                </select>
                            </fieldset>	
                        
                            <fieldset><legend>TITRE</legend>
                                <textarea name="titre" value={this.state.titre} rows="3" cols="50" placeholder="Titre" onChange={this.onChange}></textarea>
                            </fieldset>	
                            
                            <fieldset><legend>TYPE DE DOCUMENT</legend>
                                <select name="type_doc" onChange={this.onChange}>
                                    <option value="">{this.state.type_doc}</option>
                                    <option value="Lettre autographe">Lettre autographe</option>
                                    <option value="Plaquette">Plaquette</option>
                                    <option value="Manuscrit">Manuscrit</option>
                                    <option value="Gravure">Gravure</option>
                                    <option value="Dessin">Dessin</option>
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
                                <textarea name="A_biographie" onChange={this.onChange} value={this.state.A_biographie} rows="3" cols="50" placeholder="Biographie"></textarea><br/>
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
                                <textarea name="notice" onChange={this.onChange} value={this.state.notice} rows="3" cols="50" placeholder="Notice" ></textarea>
                            </fieldset>
                                
                            <fieldset><legend>INFORMATIONS SUR LE VENDEUR</legend>	
                                <textarea name="infos" onChange={this.onChange} value={this.state.infos} cols="50" placeholder="Infos" ></textarea>
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
                                    <div id="img_portrait">
                                        <input type="file" name="fic_portrait" size="40" accept="image/png, image/jpeg" onChange={this.onChangePortrait} />
                                    </div>
                                    
                                    
                                    
                                    { this.state.img_portrait ?
                                        <Fragment>
                                            <br/>
                                            <img src={portraitPath} width="70" alt={this.state.img_portrait} />
                                        </Fragment>
                                        :null
                                    }
                                    

                                </Fragment>
                                
                            </fieldset>	

                            <fieldset><legend>PRIX (€)</legend>	
                                <textarea name="prix" onChange={this.onChange} value={this.state.prix} rows="1" placeholder="Prix"></textarea>
                            </fieldset>
                            
                            <fieldset><legend>AJOUTER L'ANNONCE</legend>	
                                <button className="searchButton" type="submit" title="Ajouter l'annonce">Ajouter</button>
                            </fieldset>	
                        </form>
                    </div>
                    :
                    <div className="textConnexion">
                        Vous devez être connecté pour accéder à l'espace privé !
                    </div>
                }

            </Fragment>     
        )
    }
}
