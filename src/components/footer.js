import React from 'react'
import {Link} from 'react-router-dom'

export default function footer(props) {
    
    var connecName = [''];
    var connecLink = [''];

    if (!props.checkConnect){
        connecName[0] = 'Connexion';
        connecLink[0] = '/logIn';

        connecName[1] = 'Inscription';
        connecLink[1] = '/Inscription';
    }
    else{
        connecName[0] = 'Déconnexion';
        connecLink[0] = '/logOut';

        connecName[1] = 'Espace privé';
        connecLink[1] = '/Connexion/' + props.userType;
    }

    return (
        <div className="footer">
            
            <div className="footer_bg">
                <a href="https://www.ebay.fr/usr/oldpapergallery" target="_blank" rel="noreferrer noopener">
                    Boutique Ebay 
                </a>

                <a href="https://www.ebay.fr/fdbk/feedback_profile/oldpapergallery?filter=feedback_page:All" target="_blank" rel="noreferrer noopener">
                    Avis clients
                </a>

                <Link to="/Contact/" title="Qui sommes-nous ?">
                    Qui sommes Nous ?
                </Link>
            </div>
            
            <div className="footer_bc">
                <p>
                    Old Paper Gallery<br/>
                    2 rue de la concorde - 33000 Bordeaux<br/>
                </p>
                <div className="p1">
                    <Link to="/GestionMessagerie/NewMessage" style={{color:"red", cursor:"pointer", textDecoration:"none", fontFamily:"Antic Slab"}} >fr.chabaud@gmail.com<br/></Link>
                </div>
                <p>
                    06 86 76 86 04<br/>
                    sarl - siren : 305 365 132
                </p>
                

                <img src="https://counter8.stat.ovh/private/compteurdevisite.php?c=dy8cx3kqu4ld69cg31dndg6296upqzjj" title="Compteur de visite" alt="Compteur de visite" />
          
            </div>

            
            <div className="footer_bd">
                <Link to={connecLink[0]} title="Se connecter à votre compte">
                    {connecName[0]}
                </Link>

                <Link to={connecLink[1]} title="S'inscrire sur Old Paper Gallery">
                    {connecName[1]}
                </Link>
            </div>

        </div>
    )
}
