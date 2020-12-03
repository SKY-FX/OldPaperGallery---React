import React, { Component, Fragment } from 'react'
import axios from 'axios'
import './inscription.css'

export default class inscription extends Component {
   
    constructor(props)
    {
        super(props);
        this.state = {
            checked : true,
            result : ''
        };
    }

    handleSubmit = (event) => {
        event.preventDefault(); 

        console.log("RESULTAT1");
        
        var news = this.state.checked;
        if (news==="false")  news = "non";
        else news = "oui";

        const url = "/api/addUserInBd.php";
        var formData = new FormData();
        formData.append('nom_prenom', this.state.nom_prenom);
        formData.append('email', this.state.email);
        formData.append('tel', this.state.tel);
        formData.append('mot_de_passe', this.state.mot_de_passe);
        formData.append('newsletters', news);

        // Fait appel à l'API PHP "SEARCH",  en paramètre "la recherche utilisateur"
        axios({
            method: 'post',
            url: url,
            data: formData
        })

        // Renvoie le résultat de la recherche ( objet de tableau ) au parent
        .then(response => {
            // console.log("SEARCH", this.state.email);
            console.log("RESULTAT", response.data);

            this.setState({
                result : response.data
            });
        })

        // Affiche l'erreur
        .catch(error => {
            console.log(error);
        }); 

    }

    handleNewsLetter = (event) => {
        event.preventDefault(); 
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            checked : !this.state.checked,
            [name] : value
        });
        // console.log("Newsletter");
    }

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name] : value
        });
    }

    render() {
        return (
            <Fragment>
                
                { (this.state.result==='') ?
                    <form onSubmit={this.handleSubmit} > 
                        <fieldset className="fieldSetConect"><legend>Inscription</legend>
                            <input className="item_connexion" type="text" name="nom_prenom" placeholder="Nom-Prénom" required onChange={this.handleChange} />
                            <input className="item_connexion" type="text" name="email" placeholder="Email" required  onChange={this.handleChange} />
                            <input className="item_connexion" type="text" name="tel" placeholder="Téléphone" onChange={this.handleChange} />
                            <input className="item_connexion" type="password" name="mot_de_passe" placeholder="Mot de passe" required onChange={this.handleChange} />
                            <br/>
                            <div className="checkbox">
                                <p>Newsletters<br/></p>	
                                <input type="checkbox" name="newsletters" checked={this.state.checked} onChange={this.handleNewsLetter} />
                            </div>
                            					
                            <br/>
                            <button className="connectButton" type="submit" title="Cliquez ici pour s'abonner">Je m'inscris</button>
                        </fieldset>
                    </form>
                    :
                    null 
                }

                { (this.state.result===1) ?
                    <div className="textConnexion">
                        L'adresse électronique <b style={{ color:'#fff6c5' }}>{this.state.email}</b> a bien été enregistré sur ce site.
                        <br/><br/>
                        Vous pouvez désormais vous connecter et accéder à votre messagerie privée !
                    </div>
                    :
                    null
                }

                { (this.state.result===2) ?
                    <div className="textConnexion">
                        L'adresse électronique <b style={{ color:'#fff6c5' }}>{this.state.email}</b> est déjà enregistré sur ce site !
                        <br/><br/>
                        Vous pouvez accéder à votre messagerie privée à l'aide de cette adresse et de votre mot de passe.
                    </div>
                    :
                    null
                } 
            </Fragment>
        )
    }
}
