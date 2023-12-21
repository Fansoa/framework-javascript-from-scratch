import MiniReact from "../../core/MiniReact.js";

export default class BrowserLink extends MiniReact.Component {
  renderComponent() {
    const redirectTo = (event) => {
      event.preventDefault();
      history.pushState(null, null, this.props.to);
    };

    this.data.functions[`redirectTo_{{key}}`.interpolate(this)] = redirectTo;
    this.data.content = `<a href="" onclick="redirectTo_{{key}}">
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
