export const createElement = function (type, props, events, content, children) {
    return {
        type,
        props,
        events,
        content,
        children,
    };
};

export class Component {
    constructor(props){
        this.props = props;
    }
}
