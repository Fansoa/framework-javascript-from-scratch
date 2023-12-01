# Titre

## render

### Fonctionnement

- Paramètres
  - element = l'élément à ajouter (le children)
  - container = le container (la div avec l'id root normalement)

Création du this.treeRoot

### Structure du treeRoot

```
{
  dom: container,
  props: {
  },
  children: [
    element
  ],
}
```

- dom = le dom du container (`<div id="root"></div>`)
- props = les différents props
- children = le contenu / les enfants

## createElement

### Structure d'un élément (lors d'un createElement / createTextElement)

```
{
  type,
  props: {...},
  children: [
    {...}
  ],
}
```

- **type** = le type d'élément
- **props** 
  - props
  - states
  - events
  - content (si c'est un text node)
- **children** = les enfants


## Next step

1. createDom (pour convertir l'objet de configuration en node afin de pouvoir l'afficher)  ✅

2. Créer une méthode setDomProps (On set les props uniquement, ni les events ni les children) ✅

    1. Check si le props est un event ou non ✅

    2. Gérer l'ajout des class (className) ✅

3. Créer une méthode setDomEvents (Qui implémentera les events uniquement) ✅

4. Ajouter la gestion des enfants via la récursion (**À changer plus tard car il s'agit d'une mauvaise structuration**) ✅

5. Ajouter un composant (juste une fonction qui retournera une structure pour le moment) ✅

6. Ajouter un useState (se baser sur la structure react plutôt que d'aller direct vers un setState) ⛔	**À changer ! Le useState ne DOIT PAS être dans le miniReact, sinon il faudrait importer l'instance du miniReact dans chaque composant.**

    1. 1 paramètre pour le use state qui définira le state par défaut ✅

    2. setState prend en paramètre une fonction (prev.counter => prev.counter+1) par exemple ✅

    3. renvoie le state + le setState ✅

    4. ⛔ Pour le moment le setState ne fonctionne pas, le state n'est pas mis à jour pour le composant

