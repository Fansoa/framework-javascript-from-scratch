export const createElement = function (type, props, content, children) {
    return {
        type,
        props,
        content,
        children,
    };
};

export class Component {
    constructor(props){
        this.props = props;
        this.state = {};
    }

    setState(newVal){
        this.state = newVal === typeof 'func' ? newVal(prev) : newVal
        this.state = state;
    }
    
    useState(state){
        this.state = state;
        return [state, this.setState]
    }

}
