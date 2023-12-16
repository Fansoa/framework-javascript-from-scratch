import MiniReact from "../core/MiniReact.js";
import IncrementButton from "../components/IncrementButton.js";
import Button from "../components/Button.js";

class HomePage extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  handleClick() {
    alert('handleClick')
  }

  render() {
    const test = `<div className="Prout" events={"onClick":${this.encodeMethod(this.handleClick)}}><p>Hello</p><p>World</p></div>`
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
      testJson
    );
  }
}

export default HomePage;
