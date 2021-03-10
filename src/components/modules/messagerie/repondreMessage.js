import React, { Component, Fragment } from 'react'
import axios from "axios"
import UserProfile from '../utiles/sessionFct'

import './repondreMessage.css'

export default class repondreMessage extends Component {

    constructor (props)
    {
        super(props);
        this.state = {
            clientType : '',
            clientName : '',
            clientEmail : '',
            exp : '',
            dst : '',
            objet : '',
            message : '',
            type : ''
        }
    }

    componentDidMount()
    {
        const type = this.props.match.params.type;
        var objet = this.props.match.params.objet;
        // var obj='';
        
    
        if ( UserProfile.getType() === "Admin" )
        {
            if (type === '0')  objet = "Re : " + objet + " : "; // Reponse du vendeur à l'acheteur
            else if (type === '1')  objet = "NewsLetter : "; // Le vendeur envoie une NewsLetter à ses abonnés
        }
        else{
            if (type === '0')  objet = "Re : " + objet + " : "; // Reponse de l'acheteur au vendeur
            else if (type === '1')  objet = ""; // L'acheteur envoie un nouveau message au vendeur
        }
;
        // console.log("DID MOUNT" , objet)
        this.setState({
            clientName : UserProfile.getName(),
            clientEmail : UserProfile.getEmail(),
            clientType : UserProfile.getType(),
            exp : this.props.match.params.exp,
            dst : this.props.match.params.dst,
            objet : objet,
            text_message : '',
            type : type
        })
    }

    sendMessage = () => {
       
        var url = "/api/repondreMessage.php"; 
        // const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/repondreMessage.php";
        
        
        const exp = this.state.exp;
        const dst = this.state.dst;
        const objet = this.state.objet;
        const message = this.state.text_message;
        const clientEmail = this.state.clientEmail;
        const clientName = this.state.clientName;
        const type = this.state.type;
        // console.log("SEND MESSAGE", dst);

        
        var formData = new FormData();
        formData.append('exp', exp);
        formData.append('dest', dst);
        formData.append('objet', objet);
        formData.append('message', message);
        formData.append('clientEmail', clientEmail);
        formData.append('clientName', clientName);
        formData.append('type', type); // Pour passer le PHP en mode REPONSE DE MESSAGE

        

        // Fait appel à l'API PHP
        axios({
            method: 'post',
            url: url,
            data: formData
        })

        // Renvoie le résultat de la recherche ( objet de tableau ) au parent
        .then(response => {
            // const result = response.data;
            // console.log("RESULT REPONDRE", result);
            this.props.history.push('/GestionMessagerie/');
        })

        // Affiche l'erreur
        .catch(error => {
            console.log(error);
        }); 
    }

    onChangeText = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name] : value
        });
    }

    render() {

        var titre="Nouveau message au vendeur"
        if (this.state.clientType === "User") 
        {
            if (this.state.type === '0')  titre = "Répondre au vendeur";
            else titre = "Nouveau message au vendeur";
        }
        else if (this.state.clientType === "Admin") 
        {
            if (this.state.type === '0')  titre = "Répondre à " + this.state.dst;
            else titre = "Envoie d'une NewsLetter !";
        }

        return (
            <Fragment>   
                <div className="header_text" onClick={ () => this.props.history.goBack() } style={{cursor:"pointer", textDecoration:"none"}} >Retour</div>
         
                { this.state.clientName !== '' ?
                    <div className="repondreMessage">     
                        <fieldset>
                            <legend>{titre}</legend>
                            <textarea name="objet" value= {this.state.objet} placeholder="objet..." rows="1" onChange={this.onChangeText} ></textarea>
                            <textarea name="text_message" value={this.state.text_message} placeholder="Corps..." rows="10" onChange={this.onChangeText}></textarea>
                            <input className="bouton_abonnes" type="button" value="Envoyer" onClick={this.sendMessage} title="envoyer message"></input>
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
