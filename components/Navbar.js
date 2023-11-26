import { Component } from "../core/MiniReact.js";
import BrowserLinkComponent from "./BrowserLink.js";
import BaseInput from "./Form/BaseInput.js";

export default class Navbar extends Component {
  navbarLinks=[
    {to: "/", src: "https://cdn.builder.io/api/v1/image/assets/TEMP/7bcb275b-57a3-4fcb-88c0-9599226febd2?apiKey=6abfd9a8b9514122a12bdd9d84df704a", title: "Accueil"},
    {to: "/listing-events", src: "https://cdn.builder.io/api/v1/image/assets/TEMP/51fd9c9d-4592-4cd2-a6c7-72f7bd3c5803?apiKey=6abfd9a8b9514122a12bdd9d84df704a", title: "Liste des events"},
    {to: "/event-detail", src: "https://cdn.builder.io/api/v1/image/assets/TEMP/51fd9c9d-4592-4cd2-a6c7-72f7bd3c5803?apiKey=6abfd9a8b9514122a12bdd9d84df704a", title: "Detail event"},
  ]

  render () {
    super.render(
      this.toString
    );
  }

  toggleBurgerMenu() {
    document.getElementById('burger-menu').classList.toggle('active');
    document.getElementById('menu-links').classList.toggle('active');
  }

  toString() {
    return `<nav
    class="justify-between content-center flex-wrap shadow-lg bg-white self-stretch z-[1] flex w-full px-3.5 py-3 max-md:max-w-full fixed bg-red-500"
  >
    <div class="flex items-stretch justify-between gap-5 mt-2">
      ${new BrowserLinkComponent({
        to: "/",
        class: "w-full sm:w-auto",
        content: `<img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e6e0e6a9-3903-4f34-a498-1d11f4ac4f74?apiKey=6abfd9a8b9514122a12bdd9d84df704a&"
          class="aspect-[3.29] object-contain object-center w-[79px] fill-white overflow-hidden shrink-0 max-w-full"
        />`
      }).toString()}
      <div id="menu-links" class="hidden sm:block sm:static absolute top-[100%] left-0 sm:w-auto w-full bg-white py-3 sm:py-0">
        <div
          class="items-stretch content-start flex-wrap flex justify-between gap-4 w-full sm:w-auto"
        >
          ${this.navbarLinks.map(link => {

            return new BrowserLinkComponent({
              to: link.to,
              class: "w-full sm:w-auto",
              content: `<div class="items-stretch flex sm:justify-between justify-center gap-2.5">
                <img
                  loading="lazy"
                  srcset=${link.src}
                  class="aspect-[1.04] object-contain object-center w-6 justify-center items-center overflow-hidden shrink-0 max-w-full"
                />
                <div
                  class="text-black text-center text-xs font-bold leading-4 self-center grow-0 sm:grow whitespace-nowrap my-auto"
                >
                  ${link.title}
                </div>
              </div>`
            }).toString()
          }).join('')}
        </div>
      </div>
    </div>
    ${new BaseInput({
      placeholder: 'Rechercher',
      class: {
        container: 'max-w-[160px]',
        icon: '!-right-2 !-top-1',
        input: '!py-2'
      },
    }).toString()}

    <div
      class="sm:hidden"
      id="burger-menu"
      events={"click":[${this.encodeMethod(this.toggleBurgerMenu)}]}
    >
      <div class="w-8 h-0.5 bg-gray-600"></div>
    </div>
  </nav>`}
}