export class Component {
    constructor(props){
        this.props = props;
        this.state = {};
    }

    setState(newVal){
        this.state = typeof newVal === 'function' ? newVal(this.state) : newVal
        console.error(this.render());
        const event = new CustomEvent('reRender', { 
            structure: {
                title: 'Error!',
                message: 'There was a problem creating your account.'
            }
        });

        window.dispatchEvent(event);
    }
    
    useState(state){
        this.state = state;
        return [state, this.setState]
    }

    createElement(type, props, content, children, state, key = null) {
        return {
            type,
            props,
            content,
            children,
            state,
            key,
        };
    }

    generateKey(prefix = 'cpnt') {
        return this.key ? this.key : Math.random().toString(36);
    }
}
