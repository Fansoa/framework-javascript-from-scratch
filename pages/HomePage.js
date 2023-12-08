import MiniReact from "../core/MiniReact.js";
import IncrementButton from "../components/IncrementButton.js";

class HomePage extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.state = { title: "test" };
  }

  render() {
    return this.createElement(
      "div",
      null,
      new IncrementButton({ buttonLabel: "1. bouton" }).render(),
      new IncrementButton({ buttonLabel: "2. bouton" }).render(),
    );
  }
}

export default HomePage;
