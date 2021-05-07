import React, { Component, Fragment } from 'react'
import { Helmet } from "react-helmet"
import {Link} from 'react-router-dom'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'

import ListeAnnonce from '../listeAnnonce/listeAnnonce'
import SearchFunc from '../searchFunction/searchfunc'

import UserProfile from '../utiles/sessionFct'

export default class AcheterAnnonce extends Component {
    constructor (props) {
        super(props);
        this.state = {
            searchResult : '',
            okBool : false,
            emailClient : UserProfile.getEmail(),
            nameClient : UserProfile.getName(),
            isSold : false,

            email : '',
            adresse : '',
            codePostal : '',
            ville : '',
            nom_prenom : ''
        }
    }

    componentDidMount()
    {
        var elmnt = document.getElementById("scrollInto");
        elmnt.scrollIntoView();
    }
    
    searchResult = (result) => {
        // console.log("MAIN : ", result['img_id'][0]);
        this.setState({
            searchResult : result,
        });
    }

    onSubmit = () => {
        var okBool = false;
        if (this.state.email !== '' && this.state.adresse !== '' && this.state.codePostal !== ''  && this.state.ville !== '' && this.state.nom_prenom !== '')
        {
            okBool = true;
            this.setState({
                okBool : okBool
            }) 
        }

        if (okBool)
        {
            // const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/acheterAnnonce.php";
            const url = "/api/acheterAnnonce.php";
			
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
                // console.log("ACHAT ANNONCE RESULTAT", response.data);

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
        else
        {

        }
    }

    onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        // console.log("TOTO", value)
        this.setState({
            [name] : value
        });
    }

    ScrollFunction = () => 
    {
        var elmnt = document.getElementById("scrollInto");
        elmnt.scrollIntoView({behavior: "smooth"});
    }


    render() {

		const url = "/api/search.php";
		// const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/search.php";
		
        const style={textDecoration:"none", color:"white", fontSize:"15px", color:"#fff6c5"}

        return (
            <div className="BlockAchat" id="scrollInto">
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="author" content="Chabaud Sylvain - web developer"></meta>
                    <title>Autographes - manuscrits - gravures : Old Paper Gallery</title>
                    <meta name="description" content="Nous achetons et vendons des lettres autographes, manuscrits, gravures et documents anciens"/>
                    <link rel="canonical" href="https://www.oldpapergallery.com/Search/Boutique" />
                </Helmet>

                <div className="header_text" onClick={ () => this.props.history.goBack() } style={{cursor:"pointer", textDecoration:"none"}} >Retour</div>

                { (this.state.isSold === false) ?
                    <Fragment>
                        <div className="listeRecherche">
                            <SearchFunc searchText={this.props.match.params.auteur} axiosUrl={url} return={ (result) => this.searchResult(result) } />
                            <ListeAnnonce liste={this.state.searchResult} isSold="false"/> 
                        </div> 

                        <div className="panneaux">
                
                            <div className="panneau_paiement"> 

                                <p>Vous pouvez payer<br/> directement avec votre compte Paypal !</p>
                                <br/><br/>
                                
                                <div className="paiement">
                                    <p> 
                                        {/* <Link className="link" to="/" style={style}><p> Paypal</p></Link> */}
                                        <PayPalButton
                                            amount={this.props.match.params.prix}
                                            onSuccess={(details, data) => {alert("Transaction completed by " + details.payer.name.given_name);}}
                                            style={{ color: "gold", shape: "pill", label: "pay", height: 40 }}
                                            options={{clientId: "AevqzdRQctuwP9r9Epi-6rLByaArDw_3WK8Y66aEivCYpLKi3t9Wt8BhJpsxvt6193iq27Jkv-ez3mYB", currency: "EUR"}}
                                        />
                                    
                                    </p>
                                </div>
                            </div>

                            <div className="panneau_facturation">

                                <p>Vous pouvez aussi payer<br/> par virement banquaire ou par chèque<br/><br/>
                                    - Veuillez entrer les informations de livraison -<br/>puis cliquer sur  "Valider ma commande"</p>
                                <br/><br/>

                                <div className="paiement">
                                    <p>Paiement par virement banquaire :<br/>
                                        <Link className="link" to='/docsAdmin/RIB.jpg' target="_blank" download style={style}><p>Télécharger le RIB</p></Link>
                                    </p>
                                </div>

                                <div className="paiement">
                                    <p>Paiement par chèque à l'adresse suivante :</p>
                                    <p style={style}>Chabaud François<br/>2 rue de la concorde<br/>33000 Bordeaux</p>
                                    <br/>
                                    <p>Ordre :</p>
                                    <p style={style}>Chabaud François</p>
                                </div>

                                <br/><br/>
                                <p>Entrez les informations de livraison !</p>
                                <br/><br/>

                                <fieldset className="_fieldSetConect">
                                    <div className="field"><p>Adresse de livraison</p></div>
                                    <input className="item_connexion" required type="text" name="nom_prenom" placeholder="Nom-Prénom" onChange={this.onChange} /><br/>
                                    <textarea className="item_connexion" required type="text" name="adresse" placeholder="Adresse" onChange={this.onChange}  /><br/>
                                    <input className="item_connexion" required type="text" name="codePostal" placeholder="Code postal" onChange={this.onChange} /><br/>
                                    <input className="item_connexion" required type="text" name="ville" placeholder="Ville" onChange={this.onChange}  /><br/>
                                    <input className="item_connexion" required type="text" name="tel" placeholder="Téléphone" onChange={this.onChange} /><br/>
                                </fieldset>

                                <fieldset className="_fieldSetConect">
                                    <div className="field"><p>Infos de connection<br/></p><h4 style={{fontWeight:'lighter'}}>Vous donne accès à votre espace privée et aux newsLetters (facultatif)</h4></div>
                                    <input className="item_connexion" required type="text" name="email" placeholder="Email" onChange={this.onChange} /><br/>
                                    <input className="item_connexion" required type="password" name="mot_de_passe" placeholder="Mot de passe" onChange={this.onChange}  /><br/>
                                    <br/>
                                    <button className="connectButton" title="Cliquez pour valider ma commande" onClick={this.onSubmit} >Valider ma commande</button>      
                                </fieldset>
                            </div>
                        </div>

                        { (!this.state.okBool) ?
                            <div className="textConnexion">
                                Pour les paiements par chèque ou Virement banquaire, Vous devez remplir les informations de livraison puis valider la commande !
                            </div>
                            :
                            null
                        }

                        <br /><br />
                        <button className="buttonScrollClass" onClick={ () => this.ScrollFunction() }>RETOUR<br/>Haut de page</button>

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
