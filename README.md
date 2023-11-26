# TO DO :

home.component.ts

- Utiliser un composant réutilisable "header.component.ts" qu'on pourra utiliser pour la page d'accueil et la page de détail d'un pays - ce composant réutilisable aura en entré le titre de la page et une liste de statistiques.

- les statistiques (number of JO, number of country) et le titre de la page sont absents. Il faut les ajouter.

# Introduction

Il s'agit du projet n°2 de la formation de Développeur Full-Stack - Java et Angular d'Openclassroom.

Le but de cette application est de mettre à disposition des utilisateurs un dashboard permettant de visualiser les informations des précédents Jeux olympiques (nombre de médailles par pays, etc.).

L'application est composé de trois pages :

- Page d'accueil : page principale où l'on retrouve un graphique circulaire représentant cinq pays participant aux JO et dont la taille de chaque pays dépend du nombre de médailles gagnées ;
- Page détails : page de détail pour visualiser les informations statistiques selon les pays, on retrouve des données simple et un second graphique qui présente la performance par année ;
- Page 'Not Found' : page d'erreur en cas de mauvaise saisie de l'URL.

Infos : Pour obtenir le détail d'un pays, il faut cliquer sur la pays que l'on souhaite visualiser directement sur le graph de la page d'accueil.

Pièces jointes fournies en amont du projet :

- [Starter code Github](https://github.com/OpenClassrooms-Student-Center/Developpez-le-front-end-en-utilisant-Angular)
- [Spécification](<https://course.oc-static.com/projects/D%C3%A9v_Full-Stack/D%C3%A9veloppez+le+front-end+en+utilisant+Angular/Spe%CC%81cifications+(cahier+des+charges).pdf>)
- [Maquettes](https://course.oc-static.com/projects/D%C3%A9v_Full-Stack/D%C3%A9veloppez+le+front-end+en+utilisant+Angular/P2_Wireframes.pdf)

Compétences évaluées :

- Développer le front-end d'un programme en utilisant du code Angular maintenable ;
- Gérer le versionnage de code avec Git et GitHub.

## Installation

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

Assurez-vous de l'installer avant de poursuivre avec la commande :

```bash
npm install -g @angular/cli@14.1.3
```

N'oubliez pas d'installer les dépendances en exécutant la commande suivante dans le répertoire du projet :

```bash
npm install
```

## Serveur de Développement

Pour lancer le serveur de développement, utilisez la commande suivante :

```bash
ng serve
```

Accédez à http://localhost:4200/ dans votre navigateur. L'application se rechargera automatiquement si vous apportez des modifications aux fichiers source.

## Mise en production

Pour construire le projet en vue de la production, utilisez la commande suivante :

```bash
ng build
```

Les artefacts de construction seront stockés dans le répertoire dist/.

## Informations supplémentaires

- Ce projet utilise Angular version 14.1.3. Assurez-vous de vérifier la compatibilité lors de mises à jour ou l'installation de packages supplémentaires.
- N'hésitez pas à personnaliser le projet en fonction de vos besoins spécifiques.
- Pour plus d'informations sur les commandes Angular CLI et la structure du projet, consultez la documentation officielle d'Angular.

## Licence

Ce projet est sous [licence MIT](https://chat.openai.com/c/LICENSE) - consultez le fichier [LICENSE](https://chat.openai.com/c/LICENSE) pour plus de détails.
