import MiniReact from "../core/MiniReact.js";

class Testing extends MiniReact.Component {
  constructor(props) {
    super(props);
  }

  render() {
    function handleClick() {
      alert('pouet')
    }
    this.data.functions[`handleClick_${this.key}`] = handleClick;

    this.data.content = `<span event.click="handleClick_${this.key}">
      ${this.props.test}
    </span>`;

    return this.data;
  }
}

export default Testing;
