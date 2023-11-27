export class Component {
    constructor(props){
        this.props = props;
        this.state = {};
    }

    setState(newState){
        console.log("🚀 ~ file: MiniReact.js:8 ~ Component ~ setState ~ newState:", newState(this.state))
        this.state = typeof newState === 'function' ? newState(this.state) : newState
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

    generateComponentKey() {
        return this.componentKey ? this.componentKey : Math.random().toString(36);
    }
}
