import { Component } from "../core/MiniReact.js";
import BrowserLinkComponent from "../components/BrowserLink.js";

export default class Footer extends Component {
  menuLinks={
    rightMenuLinks: [
      {to: "/page1", content: "truc 1"},
      {to: "/page1", content: "truc 1"},
      {to: "/page1", content: "truc 1"},
    ],
    linkedinLinks: [
      {to: "https://www.linkedin.com/in/christopher-debray/", name: "Christopher Debray"},
      {to: "https://www.linkedin.com/in/francoisvrn/", name: "François Verin"},
      {to: "https://www.linkedin.com/in/christopher-debray/", name: "Alexis Girard"},
    ],
  }

  render() {
    return super.render(
      this.toString()
    );
  }

  toString() {
    return `<footer
    class="justify-center items-center content-center flex-wrap bg-blue-950 self-stretch flex w-full flex-col px-5 py-9 max-md:max-w-full mt-3"
  >
    <div class="max-w-full w-full">
      <div class="flex justify-between gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0 w-full">
        <div
          class="flex flex-col items-stretch max-md:w-full max-md:ml-0"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b753b04-fc97-45df-b631-0fd1b695e09a?apiKey=6abfd9a8b9514122a12bdd9d84df704a&"
            class="fill-white overflow-hidden shrink-0 flex-1 my-auto max-md:mt-10"
          />
        </div>
        <div
          class="flex flex-col items-stretch w-[51%] ml-5 max-md:w-full max-md:ml-0"
        >
          <div
            class="items-stretch content-center flex-wrap flex grow justify-between gap-5 px-1.5 py-4 max-md:mt-2.5"
          >
            <div class="items-stretch flex grow basis-[0%] flex-col">
              <div
                class="text-white text-center text-xs font-bold leading-4 whitespace-nowrap"
              >
                Fondateurs
              </div>
              ${this.menuLinks.linkedinLinks.map(link => {
                return `
                  <div
                    class="text-white text-center text-xs leading-4 whitespace-nowrap mt-5"
                  >
                    <a href="${link.to}">${link.name}</a>
                  </div>
                `
              }).join('')}
            </div>
            <div class="items-stretch flex grow basis-[0%] flex-col">
              <div
                class="text-white text-center text-xs font-bold leading-4 whitespace-nowrap"
              >
                Je sais pas
              </div>
              ${this.menuLinks.rightMenuLinks.map(link => {
                return `
                  <div
                    class="text-white text-center text-xs leading-4 whitespace-nowrap mt-5"
                  >
                    ${new BrowserLinkComponent({
                      to: "/page1",
                      content: "truc 1"
                    }).toString()}
                  </div>
                `
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>`
  }
}