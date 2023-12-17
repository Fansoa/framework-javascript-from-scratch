# Glossaire

- Unit of work

## Unit of work
Un "unit of work" (unité de travail) dans le contexte de React et de son algorithme Fiber représente une tâche individuelle à effectuer lors de la réconciliation d'éléments. Chaque unité de travail correspond à une partie de l'arborescence des composants à mettre à jour.

Dans l'algorithme Fiber de React, une unité de travail est généralement représentée par un nœud Fiber spécifique. Ce nœud Fiber contient des informations sur un composant particulier, comme son type, ses propriétés (props), les éléments DOM associés, ses enfants, et d'autres informations nécessaires pour la réconciliation et le rendu.

Une unité de travail (un nœud Fiber) contient généralement les attributs suivants :

- **Type** : Le type de composant associé au nœud Fiber (peut être une fonctionnel, une classe, ou un élément DOM).

- **Props** : Les propriétés ou les attributs associés au composant.

- **DOM** : Une référence à l'élément DOM associé s'il s'agit d'un composant DOM.

- **Enfants** : Les nœuds Fiber représentant les enfants de ce composant.

- **Parent** : Une référence au nœud Fiber parent.

- **Sibling** (frère) : Une référence au nœud Fiber sibling (nœud suivant au même niveau de profondeur dans l'arbre).

- **Effect Tag** (étiquette d'effet) : Un indicateur utilisé pour déterminer quelles opérations doivent être effectuées lors de la mise à jour du DOM réel.

Lorsque React exécute une "unit of work", il examine et effectue les opérations appropriées pour ce nœud Fiber spécifique et ses enfants. Ensuite, il passe à d'autres nœuds Fiber pour terminer la réconciliation de l'arborescence des composants.

Chaque nœud Fiber est responsable d'une partie spécifique de l'arbre de composants et constitue une unité de travail individuelle pour gérer les mises à jour et la réconciliation de cet élément spécifique et de ses descendants.