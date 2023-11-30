export class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
        this.cachedStructure = [];
    }

    setState(newState) {
        this.state = typeof newState === 'function' ? newState(this.state) : newState;
        const changedState = this.state;
        this.markForUpdate();


        const event = new CustomEvent('reRender', {
            detail: {
                componentDetail: {
                    newState: changedState,
                    componentId: this.componentKey,
                }
            }
        });

        window.dispatchEvent(event);
    }

    markForUpdate() {
        this.needsUpdate = true;

        // If it's a class component, propagate the update to the parent
        // if (this.parentComponent) {
        //     this.parentComponent.markForUpdate();
        // }
    }

    createElement(type, props, content, children, state, componentKey = null) {
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
