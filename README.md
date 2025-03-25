# Zutom

Zutom est un fork de [Sutom](https://framagit.org/JonathanMM/sutom) fait par [JonathanMM](https://mastodon.social/@JonathanMM) pour le serveur GTA RP [SOZ](https://github.com/SOZ-Faut-etre-Sub/SOZ-FiveM-Server).

En effet son jeu est intégré dans le [ZPhone](https://github.com/SOZ-Faut-etre-Sub/SOZ-FiveM-Server/blob/e95abd2c3d584e26dabc7af510a238a5ce874f47/resources/%5Bsoz%5D/soz-core/src/nui/components/Phone/apps/zutom/ZutomApp.tsx#L12) tel quel. Le but de ce repo est d'y apporter des modifications pour les joueurs réguliers et l'adapter pour l'intégrer complètement dans l'univers du serveur.

---
## Contribution

Dans le Projet GitHub, il y a un tableau avec quelques idées et une petite todo list déjà faite. N'hésitez pas à aller y faire un tour pour contribuer / proposer des idées ! :D

---
## Déploiement Continu (CD)
Un workflow se déclanche lorsqu'il y a un nouveau tag sur la branch main. Il build l'image Docker, la push dans un [repertory Docker](https://hub.docker.com/repository/docker/thebatteur/zutom/) et update l'image sur un [serveur à moi](https://zutom.thebatteur.fr). 

---

## Développement

### Avec npm

Pour pouvoir travailler en local, il faut commencer par installer ce qu'il faut à node :

```sh
npm i
```

Puis, on lance le serveur :

```sh
npm run start:dev
```

### Avec Docker

Un Dockerfile est disponible pour pouvoir démarrer le site en local sans `npm`.

```sh
docker build --build-arg MODE=development -t sutom .

docker run -it --rm -p 4000:4000 sutom npm run start:dev
```

### Accès au site

Une fois démarré, le site sera dispo sur http://localhost:4000 et le typescript va se recompiler tout seul à chaque modification de fichier.

## Déployer en production

### Avec npm

Pour déployer en production, on installe les dépendances :

```sh
npm install --production
```

Puis on lance le serveur :

```sh
npm start
```

### Avec Docker

On lance Docker en production en créant l'image et en la lançant sans les options particulières pour le mode "development" :

```sh
docker build -t sutom .

docker run -it --rm -p 4000:4000 sutom
```

---

Copyright (c) 2022 JonathanMM