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
        console.log("🚀 ~ file: MiniReact.js:17 ~ Component ~ setState ~ newVal:", typeof newVal)
        this.state = typeof newVal === 'function' ? newVal(this.state) : newVal
        console.log("🚀 ~ file: MiniReact.js:18 ~ Component ~ setState ~ newVal === typeof 'func':", typeof newVal === 'function')
        console.log("🚀 ~ file: MiniReact.js:18 ~ Component ~ setState ~ this.state:", this.state)
        // this.state = state;
    }
    
    useState(state){
        this.state = state;
        return [state, this.setState]
    }

}
