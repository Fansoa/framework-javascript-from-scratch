# Titre

### #render

#### Fonctionnement

- Paramètres
  - element = l'élément à ajouter (le children)
  - container = le container (la div avec l'id root normalement)

Création du this.treeRoot

#### Structure du treeRoot

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

### #createElement

#### Structure d'un élément (lors d'un createElement / createTextElement)

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

    a. Check si le props est un event ou non ✅

    b. Gérer l'ajout des class (className) ✅

3. Créer une méthode setDomEvents (Qui implémentera les events uniquement) ✅

4. Ajouter la gestion des enfants via la récursion (**À changer plus tard car il s'agit d'une mauvaise structuration**) ✅

5. Ajouter un composant (juste une fonction qui retournera une structure pour le moment) ✅

6. Ajouter un useState (se baser sur la structure react plutôt que d'aller direct vers un setState) ⛔	**À changer ! Le useState ne DOIT PAS être dans le miniReact, sinon il faudrait importer l'instance du miniReact dans chaque composant.**

    a. 1 paramètre pour le use state qui définira le state par défaut ✅

    b. setState prend en paramètre une fonction (prev.counter => prev.counter+1) par exemple ✅

    c. renvoie le state + le setState ✅

    d. ⛔ Pour le moment le setState ne fonctionne pas, le state n'est pas mis à jour pour le composant

## Restructuration

2 méthodes sont correctes et ne devrai plus changer normalement

- createElement
- createTextElement

1. **render** à pour but de générer le tree / la structure root

    a. On va l'utiliser pour tous les composant logiquement non ? Du coup ça serait pas juste pour le tree root, mais générer pour TOUS les éléments

    b. Si on génère pour tous les éléments ça veut dire que le append pareil doit être géré pour chaque élément, du coup on génère la structure, puis on append le résultat au parent (**Au départ le parent sera root puis ensuite le 1er élément etc**)

    c. Le treeRoot on en aura besoin pour la réconciliation (je crois) mais pour le moment on l'utilise pas. Donc ici on va utiliser currentTree, qu'on updatera à chaque passage à un nouvel élément.

2. Il faut setup un liste chainée / une ligne d'event. Le but serait de casser le render en petite partie, au lieu de faire un render de A-Z avec boucle recursive sur les enfants.
Actuellement on lance notre render, puis pour chaque enfant on rerender etc.
    
    a. Si il y a un pb au cours de notre récursive de render tous va casser

    b. Si on veux gérer le rerender en cas de changement de state c'est obligatoire
    Il faut que l'on puisse indiquer quel enfant on veut rerender et quel enfant on garde tel quel, avec la récursive c'est impossible (enfin si surement mais j'ai absolument pas réussi avant donc autant tester comme ça)

    c. Cela permet un meilleur controle + structure en traitant chaque élément à render comme une action séparé plutôt que de lancer tous d'un coup