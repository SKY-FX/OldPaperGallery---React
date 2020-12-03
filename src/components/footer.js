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
                    Avis
                </a>
            </div>
            
            <p>
                {/* Old Paper Gallery<br/><br/> */}
                2 rue de la concorde - 33000 Bordeaux<br/>
                06 86 76 86 04 - fr.chabaud@gmail.com<br/>
                sarl - siren : XXXX
            </p>

            <div className="footer_bd">
                <Link to={connecLink[0]}>
                    {connecName[0]}
                </Link>

                <Link to={connecLink[1]}>
                    {connecName[1]}
                </Link>
            </div>

        </div>
    )
}
