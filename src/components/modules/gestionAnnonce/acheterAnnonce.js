import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

import ListeAnnonce from '../listeAnnonce/listeAnnonce'
import SearchFunc from '../searchFunction/searchfunc'

import UserProfile from '../utiles/sessionFct'

export default class AcheterAnnonce extends Component {
    constructor (props) {
        super(props);
        this.state = {
            searchResult : '',
            emailClient : UserProfile.getEmail(),
            nameClient : UserProfile.getName(),
            isSold : false
        }
    }
    
    searchResult = (result) => {
        // console.log("MAIN : ", result['img_id'][0]);
        this.setState({
            searchResult : result,
        });
    }

    onSubmit = () => {
        const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/acheterAnnonce.php";
        const idAnnonce = this.state.searchResult['img_id'][0];

        // En tete AXIOS + formatte la recherche pour axios
        var formData = new FormData();
        formData.append('id', idAnnonce);
        formData.append('nom_prenom', this.state.nom_prenom);
        formData.append('email', this.state.email);
        formData.append('adresse', this.state.adresse);
        formData.append('codePostal', this.state.codePostal);
        formData.append('ville', this.state.ville);
        formData.append('tel', this.state.tel);
        formData.append('mot_de_passe', this.state.mot_de_passe);
        formData.append('newsletters', this.state.newsletters);
        formData.append('emailClient', this.state.email);
        formData.append('nameClient', this.state.nom_prenom);
        // console.log("ON SUBMIT");
        
    
        // Fait appel à l'API PHP "SEARCH",  en paramètre "la recherche utilisateur"
        axios({
            method: 'post',
            url: url,
            data: formData
        })
    
        // Renvoie le résultat de la recherche ( objet de tableau ) au parent
        .then(response => {
            console.log("ACHAT ANNONCE RESULTAT", response.data);

            const result = response.data;

            if (result===1)
            {  
                this.setState({
                    result : result,
                    isSold : true
                });

            }
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


    render() {

        const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/search.php";
        const style={textDecoration:"none", color:"rgba(255, 248, 193, .6)"}

        return (
            <div className="BlockAchat">
                <div className="header_text" onClick={ () => this.props.history.goBack() } style={{color:"rgba(255,255,255,0.5)", cursor:"pointer", textDecoration:"none"}} >Retour</div>
    
                { (this.state.isSold === false) ?
                    <Fragment>
                        <div className="listeRecherche">
                            <SearchFunc searchText={this.props.match.params.auteur} axiosUrl={url} return={ (result) => this.searchResult(result) } />
                            <ListeAnnonce liste={this.state.searchResult} isSold="false"/> 
                        </div> 

                        <div className="panneaux">
                            <div className="panneau_paiement">

                                <p>Vous pouvez payer par chèque, virement banquaire<br/>ou directement avec votre compte Paypal !</p>
                                <br/><br/>
                                
                                <div className="paiement">
                                    <p>Paiement par paypal :</p>
                                    <Link className="link" to="/" style={style}><p>Paypal</p></Link>
                                </div>

                                <div className="paiement">
                                    <p>Paiement par virement banquaire :</p>
                                    <Link className="link" to='/docsAdmin/RIB.png' target="_blank" download style={style}><p>Télécharger le RIB</p></Link>
                                    {/* <Link to="/docsAdmin/RIB.png" target="_blank" download>RIB</Link> */}
                                </div>

                                <div className="paiement">
                                    <p>Paiement par chèque à l'adresse suivante :</p>
                                    <p style={style}>OldPaperGallery<br/>2 rue de la concorde<br/>33000 Bordeaux</p>
                                    <br/>
                                    <p>Ordre :</p>
                                    <p style={style}>OldPaperGallery</p>
                                </div>

                            </div>

                            <div className="panneau_facturation">
                                <p>Entrez les informations de livraison de de connection !</p>
                                <br/><br/>

                                    <fieldset className="fieldSetConect">
                                        {/* <legend>Infos</legend> */}
                                        <p className="textConect">Adresse de livraion</p><br/>
                                        <input className="item_connexion" required type="text" name="nom_prenom" placeholder="Nom-Prénom" onChange={this.onChange} /><br/>
                                        <textarea className="item_connexion" required type="text" name="adresse" placeholder="Adresse" onChange={this.onChange}  /><br/>
                                        <input className="item_connexion" required type="text" name="codePostal" placeholder="Code postal" onChange={this.onChange} /><br/>
                                        <input className="item_connexion" required type="text" name="ville" placeholder="Ville" onChange={this.onChange}  /><br/>
                                        <input className="item_connexion" required type="text" name="tel" placeholder="Téléphone" onChange={this.onChange} /><br/>
                                    </fieldset>

                                    <fieldset className="fieldSetConect">
                                        <p className="textConect">Infos de connection</p><br/>
                                        <input className="item_connexion" required type="text" name="email" placeholder="Email" onChange={this.onChange} /><br/>
                                        <input className="item_connexion" required type="password" name="mot_de_passe" placeholder="Mot de passe" onChange={this.onChange}  /><br/>
                                        <br/>
                                        <button className="connectButton" title="Cliquez pour valider ma commande" onClick={this.onSubmit} >Valider ma commande</button>      
                                    </fieldset>
                                

                            </div>
                        </div>
                    </Fragment> 
                    :
                    <p className="textConnexion">
                        Un message a été envoyé au vendeur pour lui signaler votre achat !
                        <br/>
                        A l'aide de vos identifiants vous pouvez accéder à votre espace privée et communiquer avec le vendeur.
                        <br/>
                        <br/>
                        L'article sera livré à l'adresse suivante lors de la réception du paiement :
                        <br/>
                        <br/>
                        {this.state.nom_prenom}<br/>
                        {this.state.adresse}<br/>
                        {this.state.codePostal}<br/>
                        {this.state.ville}
                    </p>
                }

            </div>
        )
    }
}
