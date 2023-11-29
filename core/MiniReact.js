export class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
        this.cachedStructure = {};
        /**
         * Savoir si compo est en cache ou pas
         * Quand tu createElem
         *      curseur mis sur l'élément pour lequel il a appelé le render
         *      
         */
    }

    setState(newState) {
        this.state = typeof newState === 'function' ? newState(this.state) : newState;

        const event = new CustomEvent('reRender', {
            detail: {
                structure: this.render()
            }
        });

        document.querySelector(`[data-componentkey="${this.componentKey}"]`).dispatchEvent(event);
    }

    /**
     * créer un cache avec un curseur pour check si l'instance existe.
     *      oui réconcialation
     */

    /**
     * Tu check si tu as un cache, si tu as un cache, tu vérifie si les props du cache sont différents du nouveau.
     */
    createElement(type, props, content, children, state, componentKey = null) {
        let structure;
        if (typeof type === 'function') {
            structure = new type(props).render();
            structure.owner = this;
        } else {
            structure = {
                type,
                props,
                content,
                children,
                state,
                componentKey,
                owner: this
            };
        }

        // console.log({
        //     props,
        //     type,
        //     structure
        // })

        this.cachedStructure = {
            props,
            type,
            structure
        };
        return structure;
    }
    /**
     * On rajoute le owner du composant
     * 
     */

    generateComponentKey() {
        return this.componentKey ? this.componentKey : Math.random().toString(36);
    }

    /**
     * Ajouter une method display
     * 
     *      Si les props passé sont différent de ceux sauvegardé
     *          il faut rerender l'enfant
     */
}
