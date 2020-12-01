import axios from 'axios'

function searchFunction (searchText, axiosUrl)
{
    // console.log("SEARCH FUNCTION DID MOUNT TEXT",searchText);

    var result = {};
   
    // En tete AXIOS + formatte la recherche pour axios
    const url = axiosUrl;
    var formData = new FormData();
    formData.append('searchText', searchText);

    // Fait appel à l'API PHP "SEARCH",  en paramètre "la recherche utilisateur"
    axios({
        method: 'post',
        url: url,
        data: formData
    })

    // Renvoie le résultat de la recherche ( objet de tableau ) au parent
    .then(response => {
        // console.log("SEARCH FUNCTION SEARCH", searchText);
        // console.log("SEARCH FUNCTION RESULTAT", response.data);
        // Renvoie le résultat de la recherche ( objet de tableau ) au parent
        result = response.data;
    })

    // Affiche l'erreur
    .catch(error => {
        console.log(error);
    }); 

    return result;
}

export default searchFunction;