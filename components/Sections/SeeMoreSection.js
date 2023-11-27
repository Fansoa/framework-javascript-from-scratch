import { Component } from "../../core/MiniReact.js";

export default class SeeMoreSection extends Component {
  render() {
    super.render(
      this.toString()
    );
  }

  toString() {
    return `<section
      class="items-center bg-blue-50 self-stretch flex w-full flex-col mt-16 py-20 px-5 max-md:max-w-full${this.props?.class?.container ? ' ' + this.props.class.container : ''}"
    >
      <article class="flex max-w-full flex-col items-center">
        <h1 class="text-black text-center text-xl font-bold leading-6">
          Le meilleur site pour trouver tes trucs
        </h1>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a10d3786-cacc-46b3-b9c1-f58a03e27e73?apiKey=6abfd9a8b9514122a12bdd9d84df704a&"
          class="aspect-square object-contain object-center w-9 overflow-hidden self-center max-w-full mt-10"
        />
      </article>
    </section>`
  }
}