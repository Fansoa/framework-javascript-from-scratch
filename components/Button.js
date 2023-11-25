import { Component } from "../core/MiniReact.js";
import { createElement } from "../core/MiniReact.js";

class Button extends Component {
  render() {
    return super.render(
      `
        <button 
          style={"background-color":"red"}
          events={"click":["function(){console.log('toto')}","function(){console.log('tata')}"],"mouseup":["function(){console.log('toto')}","function(){console.log('tata')}"]}
        >
          ${this.props.title}
        </button>
      `
    )
  }
}

export default Button;
