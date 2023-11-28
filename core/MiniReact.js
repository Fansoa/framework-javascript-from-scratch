export class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
        this.childStructure = [];
        /**
         * Savoir si compo est en cache ou pas
         * Quand tu createElem
         *      curseur mis sur l'élément pour lequel il a appelé le render
         *      
         */
    }

    setState(newState) {
        this.state = typeof newState === 'function' ? newState(this.state) : newState
        const event = new CustomEvent('reRender', { 
            detail: {
                structure: this.render()
            }
        });

        document.querySelector(`[data-componentkey="${this.componentKey}"]`).dispatchEvent(event);
    }

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

        // this.childStructure.push(structure);
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
