import React, { Component, Fragment } from 'react'
import UserProfile from '../utiles/sessionFct'
import axios from 'axios'

import './messagerie.css'

export default class messagerie extends Component {

    constructor (props) {
        super(props);
        this.state = {
            typeClient : UserProfile.getType(),
            nameClient : UserProfile.getName(),
            emailClient : UserProfile.getEmail(),
            result : ''
        }
    }

    componentDidMount()
    {
        this.updateResult();
    }

    updateResult ()
    {
        const userSession = this.state.nameClient;

        const url = "/api/messagerie.php";
        // const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/messagerie.php";
		
        var formData = new FormData();
        formData.append('nom_prenom', userSession);

        // Fait appel à l'API PHP
        axios({
            method: 'post',
            url: url,
            data: formData
        })

        // Renvoie le résultat de la recherche ( objet de tableau ) au parent
        .then(response => {
            const result = response.data;
            // console.log("RESULTAT MESSAGERIE", result);

            this.setState({
                result : result
            });

        })

        // Affiche l'erreur
        .catch(error => {
            console.log(error);
        }); 
    }

    changeSatut = (statuts, indiceAnnonce) => {
        
        var url = "";
        var formData = new FormData();

        const result = this.state.result;
        const emailClient = this.state.emailClient;

        const date = result[indiceAnnonce]['DATE'];
        const dst = result[indiceAnnonce]['EXP'];
        const exp = result[indiceAnnonce]['DST'];
        const objet = result[indiceAnnonce]['OBJET'];
        const message = result[indiceAnnonce]['CORPS'];

        // console.log("SEARCH MESSAGERIE", statuts);
                

        if ( statuts === 'efface' && window.confirm( "Etes-vous sûr de vouloir supprimer ce message ?" ))
        {
            url = "/api/effaceMessage.php";
        
            formData.append('date', date);
            formData.append('emailClient', emailClient);

            // Fait appel à l'API PHP
            axios({
                method: 'post',
                url: url,
                data: formData
            })

            // Renvoie le résultat de la recherche ( objet de tableau ) au parent
            .then(response => {
                const result = response.data;
                // console.log("SEARCH MESSAGERIE", result);
                this.updateResult();    
        
            })

            // Affiche l'erreur
            .catch(error => {
                console.log(error);
            }); 
        }
        else if ( statuts === 'repondre' )
        {
            // console.log("PUSH REPONDRE", exp);
            this.props.history.push("/GestionMessagerie/Repondre/0/" + exp + "/" + dst + "/" + objet + "/");
        }
        else if ( statuts === 'nouveau' )
        {
            // console.log("PUSH NOUVEAU", message);
            this.props.history.push("/GestionMessagerie/Repondre/1/ / / /");
        }
    }

    br2nl (str, replaceMode) 
    {   
        var replaceStr = (replaceMode) ? "\n" : '';
        // Includes <br>, <BR>, <br />, </br>
        return str.replace(/<\s*\/?br\s*[\/]?>/gi, replaceStr);
    }


    render() {

        const result = this.state.result;
        var visuMessa = '';
        var textButton = "";

        if (result !== '')
        {
            if (this.state.typeClient === "Admin") textButton = "Envoyez une NewsLetter à vos abonnés";
            else textButton = "Envoyez un message au vendeur";

            const passBool = result[0].EXP;
            // console.log("MESSAGERIE CONVERTIE", result);
            if (passBool !== '')
            {
                visuMessa = result.map( (mess, id) => {
                    // console.log('MESS :', mess);
                    var stylesBody = {};
                    var nameEfface = "stylesEfface" + id;
                    var nameRepondre = "stylesRepondre" + id;
                    var corps = mess['CORPS'];

                    // console.log("CORPS", corps);
                    
                    if (this.state.nameClient===mess['EXP'])
                        stylesBody = {backgroundColor:"rgba(0,0,0,.5)"};
                    else
                        stylesBody = {backgroundColor:"rgba(150,150,150,.5)"};
                    
                    const _corps = corps.split("<br />").map((i,key) => {
                        return <div key={key}>{i}</div>;
                    })

                    return (
                        <tr key={id} className="tabBody" style={stylesBody}>
                            <td><p>{mess['EXP']}</p></td>
                            <td><p>{mess['DST']}</p></td>
                            <td><p>{mess['DATE']}</p></td>
                            <td><p>{mess['OBJET']}</p></td>
                            <td>{_corps}</td>
                            
                            <td > 
                                { (this.state.nameClient===mess['EXP']) ? 
                                    <p className="p1" onClick={ () => this.changeSatut('efface', id) } name={nameEfface} >Effacer</p>
                                    :
                                    <Fragment>
                                        <p className="p1" onClick={ () => this.changeSatut('efface', id) } name={nameEfface} >Effacer</p>
                                        <br/><br/>
                                        <p className="p2" onClick={ () => this.changeSatut('repondre', id) } name={nameRepondre} >Répondre</p>
                                    </Fragment>
                                    // null
                                }
                            </td>
                        </tr>
                    )
                });
            }        
        }

        return (
            <Fragment>  
                <div className="header_text" onClick={ () => this.props.history.goBack() } style={{color:"red", cursor:"pointer", textDecoration:"none"}} >Retour</div>
            
                { this.state.nameClient !== '' ?
                    <Fragment>
                        <p className="_item" onClick={ () => this.changeSatut('nouveau', 0) } >{textButton}</p>
                
                        { visuMessa !== '' ?
                            <div className="messagerie" >

                                <p>MESSAGERIE INTERNE</p>
                                <br/>
                                
                                <table>
                                    {/* En-tête du tableau */}
                                    <thead>
                                        
                                        <tr className="tabHead">
                                            <th><p>Expéditeur</p></th>
                                            <th><p>Destinataire</p></th>
                                            <th><p>Date</p></th>
                                            <th><p>Objet</p></th>
                                            <th><p>Message</p></th>
                                            <th><p>Action</p></th>   
                                        </tr>
                                    </thead>

                                    {/* Corps du tableau */}
                                    <tbody>
                                        {visuMessa}
                                    </tbody>
                                </table>
                            </div>
                            :
                            <div className="textConnexion">
                                Vous n'avez pas de message !
                            </div>
                        }

                    </Fragment>
                    :
                    <div className="textConnexion">
                        Vous devez être connecté pour accéder à l'espace privé !
                    </div>
                }
            </Fragment>
        )
    }
}
