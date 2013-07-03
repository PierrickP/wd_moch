# WD_Mock_test

Le nom est loin d'être top, il correspond simplement aux technos utilisées.

## Cahier des charges

Éviter les régressions.
Pour cela il faudrait tester le site dans les conditions les plus réelles.

## Techno

Pour faire des tests **sur** le navigateur (simplement) il n'y a pas 36 choix.
Je suis parti sur **Selenium WebDriver** (version js)
**Mocha** pour la suite de test (vraiment top !) et **Chai** pour les *assertion*.

## Utilisation

Installation :

    git clone https://github.com/PierrickP/wd_moch.git
    cd wd_moch
    npm install
    npm install -g Mocha

Il faut lancer le *serveur selenium* avec la commande `java -jar selenium-server-standalone-2.33.0.jar`.

Oui il faut *java* :sob:

Enfin, `npm start`.

Ne pas oublier d'avoir **LBA** de lancé.

## Extension

Pour l'instant la suite de tests vérifie la page d'accueil avec :

* Fonctionnement du modal de vidéo
* Vérification des 2 liens `/chef-a-domicile`
* Recherche très simple avec **Paris**
* Vérification du fonctionnement de l'auto-complétion
* Vérification du calendrier
* Vérification de l'heure
* Enfin, on verifie que la page d'arrivée soit la bonne
