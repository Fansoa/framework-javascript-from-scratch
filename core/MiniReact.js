const MiniReact = {
    Component: class Component {
        constructor(props) {
            this.props = { ...props };
            this.state = {};
        }

        createElement(type, config, ...children) {
            if (typeof type === "function") {
                return new type(config).render();
            }
            return {
                type,
                props: { ...config, children },
                component: this,
            };
        }

        setState(newValue) {
            this.state =
                typeof newValue === "function" ? newValue(this.state) : newValue;

            const Event = new CustomEvent("reRender", {
                detail: this,
            });

            dispatchEvent(Event);
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
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                return this.createElement('TEXT_NODE', {content: node.textContent.trim()});
            }

            const data = {
                children: []
            };

            if (node.nodeType === Node.ELEMENT_NODE) {
                data.type = node.tagName.toLowerCase();
    
                if (node.hasAttributes()) {
                    data.props = Array.from(node.attributes).reduce((attrs, attribute) => {
                        if(attribute.nodeName === 'style'){
                            attrs[attribute.name] = JSON.parse(attribute.value);
                            return attrs;
                        }
    
                        if(attribute.nodeName === 'events'){
                            attrs[attribute.name] = JSON.parse(this.decodeURIComponent(attribute.value));
                            let objTmp = {}
                            for (const [event, functionList] of Object.entries(attrs[attribute.name])) {
                                objTmp[event] = functionList.map(func => eval(`(${func})`));
                            }
    
                            // return { ...attrs, events : objTmp};
                        }
    
                        attrs[attribute.name] = attribute.value;
                        return attrs;
                    }, {});
                }
                
                
                if (node.hasChildNodes()) {
                    // data.children = Array.from(node.childNodes).map(child => {
                    //     this.parseNode(child)
                    // });

                    for (const childNode of node.childNodes) {
                        if (childNode.nodeType === Node.TEXT_NODE && childNode.textContent.trim() === '') {
                            continue;
                        }
                        data.children.push(this.parseNode(childNode));
                    }
                }
            }

            return this.isEmpty(data) ? null : this.createElement(data.type, {...data.props}, ...data.children);
        }
    
        encodeMethod(method) {
            let encodeStringMethod = `"${encodeURIComponent(method)}"`.replace(/\w+(\(\))/, 'function()');

            for (const prop in this.props) {
                const regex = new RegExp(`this\\.props\\.${prop}`, 'g');
                const propValue = typeof this.props[prop] === 'string' ? `'${this.props[prop]}'` : this.props[prop]
                encodeStringMethod = encodeStringMethod.replace(regex, propValue);
            }
            
            return encodeStringMethod;
        }
    
        decodeURIComponent(uriComponent) {
            return decodeURIComponent(uriComponent).replace(/(\t|\n|\r)/g, ' ');
        }
    
        render(element){
            return this.htmlToJson(element);
        }
    },
};

export default MiniReact;
