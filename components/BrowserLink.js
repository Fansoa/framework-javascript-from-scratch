import MiniReact from "../core/MiniReact.js";

export default class BrowserLink extends MiniReact.Component {
  constructor(props) {
    super(props);
  }

  renderComponent() {
    const handleClick = (event) => {
      event.preventDefault();
      history.pushState(null, null, this.props.to);
    }

    this.data.functions[`handleClick_${this.key}`] = handleClick;
    this.data.content = `<a href="" to="${this.props.to}" onclick="handleClick_${this.key}">
      ${this.props.content}
    </a>`;
  
    return this.data;
  }

  render() {
    const component = this.renderComponent();
    const parsedContent = this.parseHTML(component.content);
    this.parseEvents(parsedContent, this.data.functions);
    
    return this.createElementNew(...parsedContent);
  }
}