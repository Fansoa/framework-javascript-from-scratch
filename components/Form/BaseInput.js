import { Component } from "../../core/MiniReact.js";

export default class BaseInput extends Component {
  render() {
    return super.render(
      this.toString()
    )
  };

  toString() {
    return `<div class="relative${this.props.class?.container ? ' ' + this.props.class.container : ''}">
      <input class="block w-full bg-inherit text-gray-700 border border-gray-200 rounded py-3 px-4 pr-10 leading-tight focus:outline-none focus:bg-white focus:border-gray-500${this.props.class?.input ? ' ' + this.props.class.input : ''}" id="grid-last-name" type="text" placeholder="${this.props.placeholder}">
      <img
        loading="lazy"
        srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/0eadba46-9623-4bcd-98a0-848d288e0ddf?apiKey=6abfd9a8b9514122a12bdd9d84df704a"
        class="absolute scale-50 top-0 right-0 bg-inherit${this.props.class?.icon ? ' ' + this.props.class.icon : ''}"
      />
    </div>`;
  }
}