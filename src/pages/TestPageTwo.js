import MiniReact from "../../core/MiniReact.js";

export default class TestPageTwo extends MiniReact.Component {
  render() {
    this.data.content = this.parseHTML(`<section>
      TestPageTwo
    </section>`);

    return this.createElement(...this.data.content);
  }
}
