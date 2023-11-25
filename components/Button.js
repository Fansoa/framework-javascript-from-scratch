import { Component } from "../core/MiniReact.js";

class Button extends Component {
  handleClick() {
    alert('Hello');
  }

  render() {
    return super.render(
      `
        <button 
          style={"background-color":"red"}
          events={"click":[${this.encodeMethod(this.props.onClick)},${this.encodeMethod(this.handleClick)}]}
        >
          ${this.props.title}
        </button>
      `
    )
  }
}

export default Button;
