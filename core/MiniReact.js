export class Component {
    constructor(props){
        this.props = props;
        this.state = {};
    }

    setState(newVal){
        console.error("SET STATE")
        this.state = typeof newVal === 'function' ? newVal(this.state) : newVal
        const event = new CustomEvent('reRender', { 
            detail: {
                structure: this.render(),
            }
        });

        dispatchEvent(event);
    }
    
    useState(state){
        this.state = state;
        return [state, this.setState]
    }

    createElement(type, props, content, children, state, componentKey = null) {
        return {
            type,
            props,
            content,
            children,
            state,
            componentKey,
        };
    }

    generateComponentKey(prefix = 'cpnt') {
        return this.componentKey ? this.componentKey : Math.random().toString(36);
    }
}
