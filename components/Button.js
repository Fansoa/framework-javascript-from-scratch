import { Component } from "../core/MiniReact.js";

class Button extends Component {

  constructor(props){
    super(props);
    this.state = { counter: 0 }
  }

  handleClick() {
    this.state = this.state + 1;
    console.log(this.state);
    alert('Hello');
  }

  render() {
    return super.render(
      `
        <button 
          style={"background-color":"red"}
          events={"click":[${this.encodeMethod(this.props.onClick)},${this.encodeMethod(this.handleClick)}]}
        >
          ${this.props.title} ${this.state.counter}
        </button>
      `
    )
  }
}

export default Button;
