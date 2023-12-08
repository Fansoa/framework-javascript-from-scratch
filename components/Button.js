import MiniReact from "../core/MiniReact.js";

class Button extends MiniReact.Component {
  render() {
    return this.createElement(
      "button",
      { onClick: this.props.onClick },
      this.createElement("TEXT_NODE", { text: this.props.label }),
    );
  }
}

export default Button;
