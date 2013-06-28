# WD_Mock_test

Le nom est loin d'etre top, il correspond simplement aux technos utilisées.

## Cahier des charges

Eviter les régressions.
Pour cela il faudrait tester le site dans les conditions les plus réels.

## Techno

Pour faire des tests **sur** le browser (simplement) il n'y a pas 36 choix.
Je suis partie sur **Selenium WebDriver** (version js)
**Mocha** pour la suite de test (vraiment top !) et **Chai** pour les *assertion*

## Utilisation

Cloner le depot, ``npm install`` et ``npm install -g Mocha``
Il faut lancer le *serveur selenium* avec la commande ``java -jar selenium-server-standalone-2.33.0.jar``

Oui il faut *java* :sob:

Enfin, ``npm start``

Pas oublier d'avoir **LBA** de lancer

## Extension

Pour l'instant la suite de tests, test la homepage avec :

* Fonctionnement du modal de video
* Verification des 2 liens ``/chef-a-domicile``
* Recherche tres simple avec **Paris**
* Verification du fonctionnement de l'auto-completion
* Verification du calendrier
* Verification de l'heure
* Enfin, on verifi que la page d'arrivé soit la bonne
