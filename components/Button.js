import { Component } from "../core/MiniReact.js";
import { createElement } from "../core/MiniReact.js";

class Button extends Component {
  render() {
    return createElement('button', { style: { 'background-color': 'red'}}, { click: [this.props.onClick]}, null, [createElement('TEXT_NODE', null, null, this.props.title, null)])
  }
}

export default Button;
