import React, { Component, Fragment } from 'react'
import axios from "axios"
// import UserProfile from '../utiles/sessionFct'

import './repondreMessage.css'

export default class repondreMessage extends Component {

    constructor (props)
    {
        super(props);
        this.state = {
            clientName : '',
            clientEmail : '',
            objet : '',
            text_message : '',
        }
    }

    componentDidMount()
    {
        var elmnt = document.getElementById("scrollInto");
        elmnt.scrollIntoView();
    }

    sendMessage = () => {
       
        var url = "/api/newMessageAccueil.php"; 
        // const url = "http://monsite/monAppReact/old-paper-gallery-react/src/components/api/newMessageAccueil.php";
        
        const objet = this.state.objet;
        const message = this.state.text_message;
        const clientEmail = this.state.clientEmail;
        const clientName = this.state.clientName;

        
        var formData = new FormData();
        formData.append('objet', objet);
        formData.append('message', message);
        formData.append('clientEmail', clientEmail);
        formData.append('clientName', clientName);

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
            this.props.history.push('/');
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

        return (
            <div id="scrollInto">   
                <div className="header_text" onClick={ () => this.props.history.goBack() } style={{cursor:"pointer", textDecoration:"none"}} >Retour</div>
         
                <div className="repondreMessage">     
                    <fieldset>
                        <legend>{titre}</legend>
                        <textarea name="clientName" value= {this.state.clientName} placeholder="votre nom..." rows="1" onChange={this.onChangeText} ></textarea>
                        <textarea name="clientEmail" value= {this.state.clientEmail} placeholder="votre email..." rows="1" onChange={this.onChangeText} ></textarea>
                        <textarea name="objet" value= {this.state.objet} placeholder="objet..." rows="1" onChange={this.onChangeText} ></textarea>
                        <textarea name="text_message" value={this.state.text_message} placeholder="Corps..." rows="10" onChange={this.onChangeText}></textarea>
                        <input className="bouton_abonnes" type="button" value="Envoyer" onClick={this.sendMessage} title="envoyer message"></input>
                    </fieldset>
                </div>
            </div>
        )
    }
}
