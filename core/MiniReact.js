import { cache } from "./CachingService.js";

export class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
        this.cachedStructure = [];
        this.cacheService = cache;
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

    createElement(type, props, content, children, state, componentKey = null) {
        console.error(componentKey)
        let structure;
        if (typeof type === 'function') {
            structure = new type(props).render();
            structure.parentProps = props;
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

        // return structure;

        if (structure.parentProps && this.cacheService.savedTree) {
            console.warn(structure)
            console.log(componentKey)
            const cachedStructure = this.cacheService.getStructureByComponentKey(structure.componentKey);
            console.log(cachedStructure)
            // if (cachedStructure ) {
            //     //&& this.areParentPropsEqual(cachedStructure.parentProps, props)
            //     console.group('GROUP')
            //     console.log(cachedStructure)
            //     console.log(props)
            //     console.groupEnd()
            //     structure = cachedStructure;
            // }
        }
    
        if (!structure) {
            if (typeof type === 'function') {
                structure = new type(props).render();
                structure.parentProps = props;
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
        }
    
        return structure;
    }

    generateComponentKey() {
        return this.componentKey ? this.componentKey : Math.random().toString(36);
    }
}
