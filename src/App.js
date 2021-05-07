import React, { Component } from 'react';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';
// import {Helmet} from "react-helmet"
// import Carousel from 'react-image-carousel';
// require("../node_modules/react-image-carousel/lib/css/main.min.css");

import Header from "./components/header"

import ListeRecherche from './containers/listeRecherche'
import LienRecherche from './containers/lienRecherche'

import NavBar from './components/modules/navBar/navBar'
import Auteurs from './components/modules/auteur/listeAuteur'

import Client from './components/modules/client/client'
import Inscription from './components/modules/inscription/inscription'
import Connexion from './components/modules/connexion/connexion'
import Deconnection from './components/modules/deconnection/logout'

import Messagerie from './components/modules/messagerie/messagerie'
import RepondreMessage from './components/modules/messagerie/repondreMessage'

import GestionAnnonce from './components/modules/gestionAnnonce/gestionAnnonce'
import VisualiserAnnonce from './components/modules/gestionAnnonce/visualiserAnnonce'
import EffacerAnnonce from './components/modules/gestionAnnonce/effacerAnnonce'
import ModifierAnnonce from './components/modules/gestionAnnonce/modifierAnnonce'
import AjouterAnnonce from './components/modules/gestionAnnonce/ajouterAnnonce'
import AcheterAnnonce from './components/modules/gestionAnnonce/acheterAnnonce'
import MesVentes from './components/modules/vente/vente'
import Contact from './components/modules/contact/contact'
import NewMessage from './components/modules/messagerie/newMessage'

import defaultPage from './components/modules/defaultPage/defaultPage'


import Footer from './components/footer'

import './App.css'
import './containers/backgroundSlider.css'

import UserProfile from './components/modules/utiles/sessionFct'

import back_1 from '../src/baniereImages/Aquarelle2.jpg';
import back_2 from '../src/baniereImages/port-marseille.jpg';
import back_3 from '../src/baniereImages/Marie-Antoinette.jpg';
import back_4 from '../src/baniereImages/Revolution1.jpg';
import back_5 from '../src/baniereImages/Victor-Hugo.jpg';
import back_6 from '../src/baniereImages/Aquarelle1.jpg';
import back_7 from '../src/baniereImages/Celine-Louis.jpg';
import back_8 from '../src/baniereImages/Toulouse-Lautrec.jpg';
import back_9 from '../src/baniereImages/Vernet-port-Bordeaux.jpg';
import back_10 from '../src/baniereImages/Maréchal-Michel-Ney.jpg';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";




function reportWindowSize() {
  const widthOutput = document.querySelector('.home-carousel');
  // console.log(window.innerWidth);
  const toDelete = window.innerWidth/2 - 750;
  widthOutput.style.left = toDelete + 'px';
}


window.onresize = reportWindowSize;


class App extends Component {

  constructor(props) 
  {
    super(props);
    this.state = {
      checkConnect : false
    }
  }

  

  
  componentDidMount()
  {
    reportWindowSize();
  }

  checkConnect = (connect) => {
    // console.log("APP", connect);
    this.setState({
      checkConnect : connect
    });
  };


  render() {

    // let images = [
    //   back_1, back_2, back_3, back_4, back_5, back_6, back_7, back_8, back_9, back_10
    // ];

    var settings = {
      adaptiveHeight: true,
      arrows: false,
      arrowsBlock: false,
      autoplay: true,
      autoplaySpeed: 5000,
      pauseOnHover: false
    };

    return (
      
      <div className="HomeClass">      
        
        {/* <li><span>Image 01</span></li>
        <li><span>Image 02</span></li>
        <li><span>Image 03</span></li>
        <li><span>Image 04</span></li>
        <li><span>Image 05</span></li>
        <li><span>Image 06</span></li>
        <li><span>Image 07</span></li>
        <li><span>Image 08</span></li>
        <li><span>Image 09</span></li>
        <li><span>Image 10</span></li> */}
  

        <div className="app">
          <div className="home-carousel">
              <div className="my-carousel">
                <Slider {...settings}>
                  <img src={back_1} />
                  <img src={back_2} />
                  <img src={back_3} />
                  <img src={back_4} />
                  <img src={back_5} />
                  <img src={back_6} />
                  <img src={back_7} />
                  <img src={back_8} />
                  <img src={back_9} />
                  <img src={back_10} />
                </Slider>
              </div>
          </div>


            <Router>
              <Header />
              <div className="main">
                <Switch>
                  {/* Page d'accueil */}
                  <Route exact path="/" component={NavBar} />

                  {/* Page de contact */}
                  <Route exact path="/Contact" component={Contact} />

                  {/* USER */}
                  {/* Page de toute les annonces */}
                  <Route exact path='/Inscription' component={Inscription}/>

                  {/* Page de recherche (2 critères de recherche)     */}
                  <Route exact path="/Search/:searchText/:searchTextDetails" component={LienRecherche} />

                  {/* Page de recherche (1 critère de recherche) */}
                  <Route exact path="/Search/:searchText" component={ListeRecherche} />

                  {/* Page de toute les annonces */}
                  <Route exact path='/SearchAuteurs' component={Auteurs}/>


                  {/* CLIENT */}
                  {/* Page de connexion */}
                  <Route 
                    exact path='/logIn' 
                    render={(props) => (
                      <Connexion {...props} return={ (res) => this.checkConnect(res) } /> 
                    )} 
                  />

                  {/* Page de deconnexion */}
                  <Route  
                    exact path='/logOut' 
                    render={ (props) => (
                      <Deconnection {...props} return={ (res) => this.checkConnect(res) } />
                    )} 
                  />

                  {/* *** */}
                  {/* Espace privé pour le client */}
                  <Route exact path='/Connexion/:client' component={Client} />


                  {/* *** */}
                  {/* MeVentes : Admin */}
                  <Route exact path='/GestionVentes' component={MesVentes}/>


                  {/* *** */}
                  {/* Messagerie du client */}
                  <Route exact path='/GestionMessagerie' component={Messagerie}/>
                  
                  {/* Messagerie du client */}
                  <Route exact path='/GestionMessagerie/Repondre/:type/:exp/:dst/:objet' component={RepondreMessage}/>

                  {/* Page pour un nouveau message depuis la page d'accueil */}
                  <Route exact path='/GestionMessagerie/NewMessage' component={NewMessage}/>


                  {/* *** */}   
                  {/* Gestion des annonces : Admin */}
                  <Route exact path='/GestionAnnonces' component={GestionAnnonce}/>

                  {/* VisualiserAnnonce : Admin */}
                  <Route exact path='/GestionAnnonces/Visualiser/:idAnnonce/:annonceVendu' component={VisualiserAnnonce}/>

                  {/* EffacerAnnonce : Admin */}
                  <Route exact path='/GestionAnnonces/Effacer/:idAnnonce' component={EffacerAnnonce}/>

                  {/* ModifierAnnonce : Admin */}
                  <Route exact path='/GestionAnnonces/Modifier/:idAnnonce' component={ModifierAnnonce}/>

                  {/* AjouterAnnonce : Admin */}
                  <Route exact path='/GestionAnnonces/Ajouter' component={AjouterAnnonce}/>

                  {/* Page d'achat d'une annonce */}
                  <Route exact path='/GestionAnnonces/AcheterAnnonce/:auteur/:titre/:prix' component={AcheterAnnonce}/>              


                  <Route exact component={defaultPage}/>

                </Switch>
              </div> 

              <Footer userType={UserProfile.getType()} checkConnect={this.state.checkConnect} />

            </Router>

        </div>
      </div>
    );
  }
}

export default App;
