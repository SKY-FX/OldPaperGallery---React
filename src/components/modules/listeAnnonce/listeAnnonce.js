import Annonce from '../annonce/annonce'

import './listeAnnonce.css'


export default function listeAnnonce (props) {
    
    console.log("LISTE ANNONCE", props.liste['ref']);

    const listeRef = props.liste['ref'];
    const listeAnnonces = props.liste;
    

    // Vérifie si des annonces ont été trouvés (si des parametres existent)
    if (listeRef) {
        const nbParams = Object.keys(listeAnnonces).length;
        const nbAnnonce = listeRef.length;

        // convertie l'objet des parametres en tableau
        var array = Object.keys(listeAnnonces).map((key) => {
            return listeAnnonces[key];
        });

        // Fabrique un tableau en réorganisant les parametres de l'annonce
        var tabParam = [];
        for (let ii=0; ii<nbAnnonce; ii++)
        {
            tabParam[ii] = new Array(nbParams);
            for (let jj=0; jj<nbParams; jj++)
            {
                tabParam[ii][jj] = array[jj][ii];
            }
        }

        console.log("LISTE ANNONCE TAB", props);
    
        // Construit les annonces
        var tabTitre = tabParam.map( (param,id) => {
            return <Annonce key={id} params={param} isSold={props.isSold} />
        });
    }

    return (
        <div className="listeAnnonce">
            {tabTitre}
        </div>
    )
}
