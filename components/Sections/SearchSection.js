import { Component } from "../../core/MiniReact.js";
import BaseInput from "../Form/BaseInput.js";

export default class SearchSection extends Component {
  render() {
    super.render(
      this.toString()
    );
  }

  toString() {
    return `<section
      class="items-center bg-blue-50 self-stretch flex w-full flex-col mt-10 py-20 px-5 max-md:max-w-full"
    >
      <div class="flex max-w-full flex-col items-center">
        <div
          class="text-black text-center text-xl font-bold leading-6 mb-5"
        >
          Cherchez votre épreuve ou je sais pas quoi
        </div>
        ${new BaseInput({placeholder: 'Entrez votre recherche'}).toString()}
      </div>
    </section>`
  }
}