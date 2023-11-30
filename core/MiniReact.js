export class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
        this.cachedStructure = [];
    }

    setState(newState) {
        this.state = typeof newState === 'function' ? newState(this.state) : newState;
        const changedState = this.state;

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
