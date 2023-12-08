const MiniReact = {
  Component: class Component {
    constructor(props) {
      this.props = { ...props };
      this.state = {};
    }

    createElement(type, config, ...children) {
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
  },
};

export default MiniReact;
