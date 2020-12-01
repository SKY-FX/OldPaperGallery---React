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
            img_nom1 : '',
            img_nom2 : '',
            img_nom3 : '',
            img_nom4 : '',
            img_nom5 : '',
            img_portrait : ''
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

        const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/ajouterAnnonce.php";

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
        formData.append('img_nom1', this.state.img_nom1);
        formData.append('img_nom2', this.state.img_nom2);
        formData.append('img_nom3', this.state.img_nom3);
        formData.append('img_nom4', this.state.img_nom4);
        formData.append('img_nom5', this.state.img_nom5);
        formData.append('img_portrait', this.state.img_portrait);
    
        // Fait appel à l'API PHP "SEARCH",  en paramètre "la recherche utilisateur"
        axios({
            method: 'post',
            url: url,
            data: formData
        })
    
        // Renvoie le résultat de la recherche ( objet de tableau ) au parent
        .then(response => {
            console.log("AJOUTE ANNONCE RESULTAT", response.data);
            const result = response.data;

            if (result!==0) this.props.history.push('/GestionAnnonces/');
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

        if (nbFiles) 
        {
            const value = event.target.files[0].name;

            this.setState({
                img_portrait : value
            })
        }
       
    }

    onChangeImages = (event) => {

        const filesTab = event.target.files;
        const nbFiles =  filesTab.length;

        // Réinitialise à vide les noms d'image dans le state du composant
        for (var iii=1; iii<=5; iii++)
        {
            const name = "img_nom" + iii;
            this.setState({
                [name] : ''
            });
        }

        if (nbFiles<=5)
        {
            for (var ii=1; ii<=nbFiles; ii++)
            {
                const fileName = event.target.files[ii-1].name;
                const name = "img_nom" + ii;
                this.setState({
                    [name] : fileName
                });
            }
            console.log("COUCOU", nbFiles)   
        }   
        else{
            window.alert("Vous pouvez télécharher au maximum 5 images !")
        }  
    }

    render() {

        const basePathPic = "/ressources/";
        const portraitPath = basePathPic.concat(this.state.img_portrait);
        // const picPath = portraitPath.concat(this.state.img_portrait);

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
                { this.state.userName !== '' ?
                    <div className="detailsAnnonceForm">

                        <fieldset><legend>REFERENCE</legend>
                            <textarea name="reference" value={this.state.reference} rows="1" placeholder="Référence" onChange={this.onChange} ></textarea>
                        </fieldset>	
                    
                        <fieldset><legend>TITRE</legend>
                            <textarea name="titre" value={this.state.titre} rows="1" placeholder="Titre" onChange={this.onChange}></textarea>
                        </fieldset>	
                        
                        <fieldset><legend>TYPE DE DOCUMENT</legend>
                            <select name="type_doc" onChange={this.onChange}>
                                <option value="">{this.state.type_doc}</option>
                                <option value="Lettre autographe">Lettre autographe</option>
                                <option value="Plaquette">Plaquette</option>
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
                            <textarea name="A_nom_prenom" onChange={this.onChange} value={this.state.A_nom_prenom} placeholder="Nom Prénom"></textarea><br/>
                            <textarea name="A_profession" onChange={this.onChange} value={this.state.A_profession} placeholder="Profession"></textarea><br/>
                            <textarea name="A_annees" onChange={this.onChange} value={this.state.A_annees} placeholder="Date de naissance et de décès"></textarea><br/>
                            <textarea name="A_lieu" onChange={this.onChange} value={this.state.A_lieu} placeholder="Lieu de naissance et de décès"></textarea><br/>
                            <textarea name="A_biographie" onChange={this.onChange} value={this.state.A_biographie} placeholder="Biographie"></textarea><br/>
                        </fieldset>

                        <fieldset><legend>IDENTITE DU DESTINATAIRE</legend>
                            <textarea name="D_nom_prenom" onChange={this.onChange} value={this.state.D_nom_prenom} placeholder="Nom Prénom" ></textarea><br/>
                            <textarea name="D_profession" onChange={this.onChange} value={this.state.D_profession} placeholder="Profession" ></textarea><br/>
                            <textarea name="D_annees" onChange={this.onChange} value={this.state.D_annees} placeholder="Date de naissance et de décès" ></textarea><br/>
                            <textarea name="D_lieu" onChange={this.onChange} value={this.state.D_lieu} placeholder="Lieu de naissance et de décès" ></textarea><br/>
                        </fieldset>

                        <fieldset><legend>ETAT</legend>
                            <textarea name="etat" onChange={this.onChange} value={this.state.etat} placeholder="Etat" ></textarea>
                        </fieldset>
                                
                        <fieldset><legend>DIMENSION</legend>
                            <textarea name="dimension" onChange={this.onChange} value={this.state.dimension} placeholder="Dimension" ></textarea>
                        </fieldset>
                            
                        <fieldset><legend>NOTICE</legend>					
                            <textarea name="notice" onChange={this.onChange} value={this.state.notice} placeholder="Notice" ></textarea>
                        </fieldset>
                            
                        <fieldset><legend>INFORMATIONS SUR LE VENDEUR</legend>	
                            <textarea name="infos" onChange={this.onChange} value={this.state.infos} placeholder="Infos" ></textarea>
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
                                
                                <Fragment>
                                    <a href={portraitPath}>
                                    <br/>
                                        <img src={portraitPath} width="70" alt={this.state.img_portrait} />
                                    </a>
                                </Fragment>

                            </Fragment>
                            
                        </fieldset>	

                        <fieldset><legend>PRIX (€)</legend>	
                            <textarea name="prix" onChange={this.onChange} value={this.state.prix} placeholder="Prix"></textarea>
                        </fieldset>
                        
                        <fieldset><legend>AJOUTER L'ANNONCE</legend>	
                            <button className="searchButton" onClick={this.onClick} title="Ajouter l'annonce">Ajouter</button>
                        </fieldset>	
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
