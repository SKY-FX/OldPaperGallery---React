import React, { Component, Fragment } from 'react'
import axios from 'axios'

import UserProfile from '../utiles/sessionFct'

import './vente.css'

export default class vente extends Component {
    
    constructor (props) {
        super(props);
        
        this.state = {
            vendeur_email : UserProfile.getEmail(),
            resultVente : '',
            typeVente : '1',
            emailToSend : ''
        };
    }

    componentDidMount()
    {
        var result="";
        const typeVente = this.state.typeVente;
        // console.log("Gestion VENTE", typeVente);
        
        // En tete AXIOS + formatte la recherche pour axios
        const url = "/api/mesVentes.php";
        // const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/mesVentes.php";
        
        var formData = new FormData();
        formData.append('type', typeVente);
        
    
        // Fait appel à l'API PHP "SEARCH",  en paramètre "la recherche utilisateur"
        axios({
            method: 'post',
            url: url,
            data: formData
        })
    
        // Renvoie le résultat de la recherche ( objet de tableau ) au parent
        .then(response => {
            result = response.data;
            // console.log("componentDidMount", result);

            this.setState({
                resultVente : result,
                typeVente : typeVente
            });
        })
        
        // Affiche l'erreur
        .catch(error => {
            console.log(error);
        }); 
    }
        


    onClick = (infoAnnonce, functType) => {
        
        const url = "/api/validePaiement.php";
        // const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/validePaiement.php";
        

        var alertToDisplay = "";
        var formData = new FormData();
        formData.append('annonce_ref', infoAnnonce['annonce_ref']);
        formData.append('acheteur_email', infoAnnonce['acheteur_email']);

        if (functType==='recu')
        {
            alertToDisplay = "Avez-vous reçu le paiment de " + infoAnnonce['acheteur_nom'] + " ?";
            // console.log("PAIEMENT RECU", functType);            
            formData.append('type', 0);
            
        }
        else if (functType==='remis')
        {
            alertToDisplay = "Etes-vous sûr de vouloir remettre cette annonce ( ref:" + infoAnnonce['annonce_ref'] + " ) de '" + infoAnnonce['annonce_nomAuteur'] + "' en vente ?";
            // console.log("REMIS EN LIGNE", functType);
            formData.append('type', 1);

        }
        else if (functType==='email')
        {
            alertToDisplay = " Vous êtes sur le point d'envoyer la facture à " + infoAnnonce['acheteur_nom'] + " !";
            // console.log("ENVOYER FACTURE", functType);
            formData.append('type', 2);

            formData.append('buildDate', infoAnnonce['annonce_date']);
            formData.append('vendeur_email', this.state.vendeur_email);
            formData.append('acheteur_email', infoAnnonce['acheteur_email']);
            formData.append('acheteur_nom', infoAnnonce['acheteur_nom']);
            formData.append('acheteur_adresse', infoAnnonce['acheteur_adresse']);
            formData.append('acheteur_codePostal', infoAnnonce['acheteur_codePostal']);
            formData.append('acheteur_ville', infoAnnonce['acheteur_ville']);
            formData.append('annonce_typeDoc', infoAnnonce['annonce_typeDoc']);
            formData.append('annonce_nomAuteur', infoAnnonce['annonce_nomAuteur']);
            formData.append('annonce_titre', infoAnnonce['annonce_titre']);
            formData.append('annonce_prix', infoAnnonce['annonce_prix']);
        }


        if (window.confirm( alertToDisplay ))
        {
            // Fait appel à l'API PHP
            axios({
                method: 'post',
                url: url,
                data: formData
            })

            // Renvoie le résultat de la recherche ( objet de tableau ) au parent
            .then(response => {
                // const result = response.data;
                // console.log("SEARCH VENTES", result);
                // console.log("onClick", result);

                // Redirige vers l'url pour l'envoie d'email
                // Simule le comportement d'un href
                // if (functType==='email') window.location.href = result;
                // else this.typeVente('0')
            })

            // Affiche l'erreur
            .catch(error => {
                console.log(error);
            }); 
        }

    };

    typeVente = ( typeVente ) => {
        // console.log("TYPE VENTE :", typeVente)

        var result="";
        
        // En tete AXIOS + formatte la recherche pour axios
        const url = "/api/mesVentes.php";
        // const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/mesVentes.php";
        
        var formData = new FormData();
        formData.append('type', typeVente);
        
    
        // Fait appel à l'API PHP "SEARCH",  en paramètre "la recherche utilisateur"
        axios({
            method: 'post',
            url: url,
            data: formData
        })
    
        // Renvoie le résultat de la recherche ( objet de tableau ) au parent
        .then(response => {
            result = response.data;
            // console.log("componentDidMount", result);

            this.setState({
                resultVente : result,
                typeVente : typeVente
            });
        })
        
        // Affiche l'erreur
        .catch(error => {
            console.log(error);
        });

    }

    // goBack = () => this.props.history.goBack();


    render() {

        // if ( this.state.vendeur_email !== '0' )
        var afficheVentes = '';

        const resultObj = this.state.resultVente;
        // console.log("result", resultObj)

        // Onconvertie Objet en tableau
        var resultTab = Object.keys(resultObj).map(function(cle) {
            return resultObj[cle];
        });
        // console.log("render", resultTab)
        // Créer un tableau unique avec toutes les annonces en cours ou vendu
        
        var result = [];
        resultTab.map( res => {
            // Pour chaque annonce d'un acheteur
            res.map ( infoAnnonce => result.push(infoAnnonce));
            return null;
        });
        // console.log("_render", result)

        // On cree le tableau des ventes que si il y a des annonces trouvés
        
        if (result.length !== 0)
        {
            // Pour chaque acheteur
            afficheVentes = result.map( (infoAnnonce, id) => {
                const acheteur_email        = infoAnnonce['acheteur_email'];
                const acheteur_nom          = infoAnnonce['acheteur_nom'];
                const annonce_date          = infoAnnonce['annonce_date'];
                const annonce_nomAuteur     = infoAnnonce['annonce_nomAuteur'];
                const annonce_prix          = infoAnnonce['annonce_prix'];
                const annonce_ref           = infoAnnonce['annonce_ref'];
                const annonce_titre         = infoAnnonce['annonce_titre'];
            
                const titre = annonce_titre.split("<br />").map((i,key) => {
                    return <div key={key}>{i}</div>;
                })

                return (
                    <tr key={id} className="tabBodyVente">
                        <td><p>{acheteur_nom}<br/>({acheteur_email})</p></td>
                        <td><p>{annonce_ref}</p></td>
                        <td><p>{annonce_nomAuteur}</p></td>
                        <td><p>{titre}</p></td>
                        <td><p>{annonce_prix} €</p></td>
                        <td><p>{annonce_date}</p></td>
                        <td>
                            <div className="action">
                                { (this.state.typeVente === '0') ?
                                    <Fragment>
                                        <h5 onClick={ () => this.onClick(infoAnnonce , 'recu') } >Paiement reçu</h5>
                                        <br/><br/>
                                        <h5 onClick={ () => this.onClick(infoAnnonce, 'remis') } >Remettre en vente</h5>
                                    </Fragment>
                                    :
                                    <h5 onClick={ () => this.onClick(infoAnnonce, 'email') } >Envoyer facture</h5>						
                                    // <a href="mailto:san@antonio.net">san@antonio.net</a>
                                }	
                            </div>							
                        </td>
                    </tr>
                )
            });

            // console.log("afficheVentes",afficheVentes);
        }    

        return (

            <Fragment>
                <div className="header_text" onClick={ () => this.props.history.goBack() } style={{color:"red", cursor:"pointer", textDecoration:"none"}} >Retour</div>
    
                { this.state.vendeur_email !== '' ?
                    <div className="vente">
            
                        <table>
                            <caption>
                                { (this.state.typeVente === '1' && afficheVentes !== '') ?
                                    <p>MES ANNONCES VENDUES<br/><br/><br/></p> : null
                                }
                                { (this.state.typeVente === '0' && afficheVentes !== '') ?
                                    <p>MES ANNONCES EN ATTENTE DE PAIEMENT<br/><br/><br/></p> : null
                                }

                                <div className="selectType">
                                    <p className="item_info" onClick={ () => this.typeVente('0') } >Paiement en attente</p>	
                                    <p className="item_info" onClick={ () => this.typeVente('1') } >Vendu</p>	
                                </div>

                                <br/><br/>
                            
                            </caption>

                            { afficheVentes !== '' ?
                                <Fragment>
                                    {/* En-tête du tableau */}
                                    <thead>
                                        <tr className="tabHeadVente">
                                            <th><p>Acheteur</p></th>
                                            <th><p>Référence</p></th>
                                            <th><p>Auteur</p></th>
                                            <th><p>titre</p></th>
                                            <th><p>Prix</p></th>
                                            <th><p>Date</p></th>
                                            <th><p>Action</p></th>
                                            
                                        </tr>
                                    </thead>

                                    {/* Corps du tableau */}
                                    <tbody>
                                        {afficheVentes}
                                    </tbody>
                                </Fragment>
                                :
                                <Fragment>
                                    { this.state.typeVente === '1' ?
                                        
                                        <div style={{padding:"20px"}}>Il n'y a pas d'annonce vendu</div>
                                        :
                                        <div style={{padding:"20px"}}>Il n'y a pas d'annonce en attente de paiement</div>
                                    }
                                </Fragment>
                            }

                        </table>
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
