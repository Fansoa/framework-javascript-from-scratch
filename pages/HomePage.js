import MiniReact from "../core/MiniReact.js";
import IncrementButton from "../components/IncrementButton.js";
import Button from "../components/Button.js";

class HomePage extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  render() {
    const test = `<div className="Prout"><span>Hello</span><span>World</span></div>`
    const testJson = this.htmlToJson(test);
    console.log(testJson);

    return this.createElement(
      "div",
      null,
      this.createElement(IncrementButton, { buttonLabel: "1. bouton" }),
      this.createElement(IncrementButton, { buttonLabel: "2. bouton" }),
      this.createElement(
        "div",
        null,
        this.createElement(Button, {
          onClick: () =>
            this.setState((prev) => ({
              ...prev,
              counter: this.state.counter + 1,
            })),
          label: "button",
        }),
      ),
      this.createElement("TEXT_NODE", { text: this.state.counter }),
    );
  }
}

export default HomePage;
