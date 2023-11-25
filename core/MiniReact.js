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

    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    htmlToJson(htmlString) {
        const domParser = new DOMParser();
        const doc = domParser.parseFromString(htmlString, 'text/html');

        return this.parseNode(doc.body.firstChild);
    }
    
    parseNode(node) {
        const data = {};
        
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
            return createElement('TEXT_NODE', null, null, node.textContent.trim(), null);
            }
            
            if (node.nodeType === Node.ELEMENT_NODE) {
                data.type = node.tagName.toLowerCase();
                
                if (node.hasAttributes()) {
                    data.props = Array.from(node.attributes).reduce((attrs, attribute) => {
                    if(attribute.nodeName === 'style'){
                        attrs[attribute.name] = JSON.parse(attribute.value);
                        
                        return attrs;
                    }

                    if(attribute.nodeName === 'events'){
                        this.decodeURIComponent(attribute.value)
                        attrs[attribute.name] = JSON.parse(this.decodeURIComponent(attribute.value));
                        let objTmp = {}
                        for (const [event, functionList] of Object.entries(attrs[attribute.name])) {
                            objTmp[event] = functionList.map(func => eval(`(${func})`));
                        }

                        return { ...attrs, events : objTmp};
                    }

                    attrs[attribute.name] = attribute.value;
                    return attrs;
                    }, {});
            }
            
            if (node.hasChildNodes()) {
                data.children = Array.from(node.childNodes).map(child => this.parseNode(child));
            }
        }
        
        return this.isEmpty(data) ? null : createElement(data.type, data.props, data.props.events, null, data.children);
    }

    encodeMethod(method) {
        return `"${encodeURIComponent(method)}"`.replace(/\w+(\(\))/, 'function()');
    }

    decodeURIComponent(uriComponent) {
        return decodeURIComponent(uriComponent).replace(/(\t|\n|\r)/g, ' ');
    }

    render(element){
        return this.htmlToJson(element);
    }
}

