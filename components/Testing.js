import MiniReact from "../core/MiniReact.js";

class Testing extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  renderComponent() {
    const handleClick = () => {
      this.setState((prev) => ({ ...prev, count: prev.count + 1 }))
    }
    this.data.functions[`handleClick_${this.key}`] = handleClick;

    this.data.content = `<span onclick="handleClick_${this.key}">
      ${this.props.test}
      ${this.state.count}
    </span>`;

    return this.data;
  }

  render() {
    const component = this.renderComponent();
    const parsedContent = this.parseHTML(component.content);
    this.parseEvents(parsedContent, this.data.functions);
    
    return this.createElementNew(...parsedContent);
  }
}

export default Testing;
