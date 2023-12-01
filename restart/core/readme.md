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

2. Créer une méthode setProps (On set les props uniquement, ni les events ni les children) ✅
    1. Check si le props est un event ou non ✅
    2. Gérer l'ajout des class (className)

3. Créer une méthode setEvents (Qui implémentera les events uniquement)

4. Tester l'implémentation et réussir à afficher un élément dans le dom