import { Component } from "../core/MiniReact.js"

export default class BrowserLinkComponent extends Component {

  handleClick() {
    history.pushState(null, null, this.props.to);
  }

  render() {
    return super.render(
      this.toString()
    );
  }

  toString() {
    return `<span
      href="${this.props.to}"
      to="${this.props.to}"
      events={"click":[${this.encodeMethod(this.handleClick)}]}
    >${this.props.title}</span>`;
  }
}