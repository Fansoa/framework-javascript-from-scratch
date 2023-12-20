import MiniReact from "../../core/MiniReact.js";

export default class BrowserLink extends MiniReact.Component {
  renderComponent() {
    const handleClick = (event) => {
      event.preventDefault();
      history.pushState(null, null, this.props.to);
    };

    this.data.functions[`handleClick_{{key}}`.interpolate(this)] = handleClick;
    this.data.content =
      `<a href="" to="{{props.to}}" onclick="handleClick_{{key}}">
      {{props.content}}
    </a>`.interpolate(this);

    return this.data;
  }

  render() {
    const component = this.renderComponent();
    const parsedContent = this.parseHTML(component.content);
    this.parseEvents(parsedContent, this.data.functions);

    return this.createElement(...parsedContent);
  }
}
