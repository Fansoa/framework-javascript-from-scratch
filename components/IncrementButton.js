import MiniReact from "../core/MiniReact.js";

class IncrementButton extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return this.createElement(
      "div",
      null,
      this.createElement(
        "button",
        {
          onClick: () =>
            this.setState((prev) => ({ ...prev, count: prev.count + 1 })),
        },
        this.createElement("TEXT_NODE", {
          text: `${this.props.buttonLabel} ${this.state.count}`,
        }),
      ),
    );
  }
}

export default IncrementButton;
