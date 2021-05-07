import React from 'react'
import { Helmet } from "react-helmet"
import './contact.css'

export default function contact() {
    return (

        <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="author" content="Chabaud Sylvain - web developer"></meta>
                <title>Autographes - manuscrits - gravures : Old Paper Gallery</title>
                <meta name="description" content="Nous achetons et vendons des lettres autographes, manuscrits, gravures et documents anciens"/>
                <link rel="canonical" href="https://www.oldpapergallery.com/Contact" />
            </Helmet>

            <div className="contact">
                
                <h1>
                    Qui sommes-nous ?
                </h1>

                <h3> 
                    <p className="letrine">M</p>
                
                    a passion pour les autographes, manuscrits, vieux papiers et gravures, a débuté il y a
                    environ 50 ans. Parmi eux des personnalités historiques, des écrivains, des acteurs de
                    théâtre ou de cinéma, des peintres, des musiciens…
                    {/* <br/><br/> */}
                    Nous avons plus de quinze mille
                    pièces à la vente, que vous trouverez pour certaines sur ce site ou celui de notre boutique
                    Ebay. D’autres ne sont pas encore en ligne Que ce soient de grands noms, de très belles
                    lettres ou documents riches d’histoire ou encore de personnalités moins connues, nous
                    essayerons de satisfaire votre recherche. 
                    {/* <br/><br/> */}
                    Quelqu’en soit l’auteur, n’hésitez pas à nous
                    contacter. Contactez nous également si vous souhaitez par ailleurs, vendre un ou
                    plusieurs documents, une archive, une collection, une succession. Nous vous ferons une
                    proposition d’achat (tous nos paiements se font comptant). 
                </h3>
            </div>
        </>
    )
}
