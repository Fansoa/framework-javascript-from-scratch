const MiniReact = {
  Component: class Component {
    constructor(props) {
      this.props = { ...props };
      this.state = {};
      this.key = this.generateRandomKey();
      this.data = {
        content: null,
        functions: {},
      };
    }

    typeCheck(props, propTypes) {
      this.checking(props, { type: "object", properties: propTypes });
    }

    checking(variable, conf, propName) {
      function typeCheckV1(variable, type) {
        if (typeof variable === "function" && type === "function") return true;
        if (typeof variable === "number" && type === "number") return true;
        if (typeof variable === "string" && type === "string") return true;
        if (typeof variable === "undefined" && type === "undefined")
          return true;
        if (
          typeof variable === "object" &&
          variable &&
          type === "null" &&
          variable !== null
        )
          return false;
        if (
          variable === null &&
          typeof variable === "object" &&
          type === "null"
        )
          return true;
        if (
          typeof variable === "object" &&
          variable !== null &&
          type === "object" &&
          Array.isArray(variable)
        )
          return false;
        if (
          typeof variable === "object" &&
          variable !== null &&
          type === "array" &&
          Array.isArray(variable)
        )
          return true;
        if (
          typeof variable === "object" &&
          variable !== null &&
          type === "object"
        )
          return true;
        return false;
      }

      if (conf.type && !typeCheckV1(variable, conf.type)) {
        console.error(
          `${this.constructor.name} - props ${propName} must be a ${conf.type}`,
        );
      }

      if (conf.enum) {
        if (typeof variable === "object") {
          const arrayWithStringifiedElements = conf.enum.map((element) =>
            JSON.stringify(element),
          );
          if (
            !arrayWithStringifiedElements.includes(JSON.stringify(variable))
          ) {
            console.error(
              `${
                this.constructor.name
              } - ${propName} value is equal to ${JSON.stringify(
                variable,
              )} instead of ${arrayWithStringifiedElements}`,
            );
          }
        } else if (!conf.enum.includes(variable)) {
          console.error(
            `${
              this.constructor.name
            } - ${propName} value should be equal to one of ${JSON.stringify(
              conf.enum,
            )}`,
          );
        }
      }

      if (conf.value) {
        if (typeof variable === "object") {
          if (JSON.stringify(conf.value) !== JSON.stringify(variable))
            console.error(
              `${
                this.constructor.name
              } - props ${propName} must be ${JSON.stringify(conf.value)}`,
            );
        }
        if (variable !== conf.value) {
          console.error(
            `${
              this.constructor.name
            } - props ${propName} must be ${JSON.stringify(conf.value)}`,
          );
        }
      }

      if (conf.properties) {
        for (const [propName, propValue] of Object.entries(conf.properties)) {
          this.checking(
            variable[propName],
            conf.properties[propName],
            propName,
          );
        }
      }
    }

    createTextElement(content) {
      return {
        type: "TEXT_NODE",
        props: {
          text: content,
          children: [],
        },
      };
    }

    createElement(type, props, children) {
      if (this.isFunction(type)) {
        // If the type is a function, it's a component; instantiate and return it
        return type({ ...props, children });
      }

      return {
        type,
        props: {
          ...props,
        },
        children: children?.map((child) =>
          typeof child === "object" ? child : this.createTextElement(child),
        ),
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

    isFunction(element) {
      return typeof element === "function";
    }

    isEvent(propName) {
      return propName.includes("on");
    }

    generateRandomKey() {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      return Array.from({ length: 10 }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length)),
      ).join("");
    }

    parseHTML(htmlString) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");

      const parseNode = (node) => {
        /**
         * structure will be the structure that is used in a createElement
         *
         * First structure element is the type
         */
        const structure = [node.nodeName.toLowerCase()];

        if (node.hasAttributes()) {
          // Second structure element is the props
          structure[1] = Array.from(node.attributes).reduce(
            (attrs, attribute) => {
              if (attribute.nodeName === "style") {
                attrs[attribute.name] = JSON.parse(attribute.value);
                return attrs;
              }
              if (this.isEvent(attribute.nodeName)) {
                const eventValue = attribute.nodeValue;
                attrs[attribute.nodeName] = eventValue;
                // attrs[attribute.nodeName] = eval(`(${eventValue})`);
              } else {
                const attributeName =
                  attribute.name === "classname" ? "className" : attribute.name;
                attrs[attributeName] = attribute.value;
              }

              return attrs;
            },
            {},
          );
        } else {
          structure[1] = {};
        }

        const children = [];
        if (node.childNodes.length > 0) {
          node.childNodes.forEach((child) => {
            if (child.nodeType === Node.ELEMENT_NODE) {
              const parsedElement = parseNode(child);
              children.push(this.createElement(...parsedElement));
              /**
               * De base il y a  && child.nodeValue.trim() !== ''
               *      J'ai retiré, si un élément n'a pas de child tous casse, donc on mettre un espace à chaque fois
               *      Comme ça il y aura toujours un child (un string vide donc osef ça impacte pas le visuel)
               */
            } else if (child.nodeType === Node.TEXT_NODE) {
              children.push(child.nodeValue.trim());
            }
          });
        }

        // Last structure element is the children
        structure[2] = children;

        return structure;
      };

      return parseNode(doc.body.firstChild);
    }

    parseEvents(content, functions) {
      const eventCallbacks = {};

      const executeCallback = (eventKey) => {
        const { func, params } = eventCallbacks[eventKey];
        if (typeof func === "function") {
          func(...params);
        }
      };

      const createCallbackFunction = (eventKey) => {
        return () => {
          executeCallback(eventKey);
        };
      };

      const traverse = (node) => {
        if (Array.isArray(node)) {
          node.forEach((item) => traverse(item));
        } else if (node && typeof node === "object") {
          Object.keys(node).forEach((key) => {
            if (key.startsWith("on") && typeof node[key] === "string") {
              const eventValue = node[key];
              const match = eventValue.match(/(\w+)(?:\(([^)]*)\))?/);

              if (match) {
                const functionName = match[1];
                const parameters = match[2]
                  ? match[2]
                      .split(",")
                      .map((param) => param.trim().replace(/['"]/g, ""))
                  : [];
                const func = functions[functionName];
                const eventKey = `${functionName}_${
                  Object.keys(eventCallbacks).length
                }`;
                eventCallbacks[eventKey] = { func, params: parameters ?? {} };
                const callbackFunction =
                  parameters.length > 0
                    ? createCallbackFunction(eventKey)
                    : func;
                node[key] = callbackFunction;
              }
            } else {
              traverse(node[key]);
            }
          });
        }
      };

      traverse(content);

      return { content, eventCallbacks };
    }

    getComponentData(component) {
      if (Array.isArray(component)) {
        return component.reduce(
          (accumulator, currentItem) => {
            Object.assign(accumulator.functions, currentItem.functions);
            accumulator.content.push(currentItem.content);
            return accumulator;
          },
          { functions: {}, content: [] },
        );
      }

      return component;
    }

    getComponentsData(components) {
      const data = {
        content: {},
        functions: {},
      };

      for (const componentName in components) {
        const component = components[componentName];
        const componentData = this.getComponentData(component);

        if (Array.isArray(componentData.content)) {
          data.content[componentName] = componentData.content.join("");
        } else {
          data.content[componentName] = componentData.content;
        }
        Object.assign(data.functions, componentData.functions);
      }

      return data;
    }

    render() {
      const component = this.renderComponent();
      const parsedContent = this.parseHTML(component.content);
      this.parseEvents(parsedContent, this.data.functions);

      return this.createElement(...parsedContent);
    }
  },
};

export default MiniReact;
