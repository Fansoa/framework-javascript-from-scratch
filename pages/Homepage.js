import { Component } from "../core/MiniReact.js";
import Footer from "../components/Footer.js";
import Navbar from "../components/Navbar.js";
import SearchSection from "../components/Sections/SearchSection.js";
import SeeMoreSection from "../components/Sections/SeeMoreSection.js";

export default class Homepage extends Component {
  render() {
    return super.render(
      this.toString()
    );
  }

  toString() {
    return `<div class="page">
        ${new Navbar().toString()}
        <main class="bg-white flex flex-col">
          ${new SeeMoreSection().toString()}
          
          <section
            class="items-center self-stretch flex w-full flex-col mt-10 py-10 px-5 max-md:max-w-full"
          >
            <article class="flex max-w-full flex-col items-center">
              <h1
                class="text-black text-center text-xl font-bold leading-6 mb-5 pb-3"
              >
                Tous les spots pour regarder vos épreuves favorites
              </h1>
              <img
                loading="lazy"
                srcset="https://cdn.builder.io/api/v1/image/assets/TEMP/a29aaed1-8a7e-4192-93ed-7817cf8ae9a2?apiKey=6abfd9a8b9514122a12bdd9d84df704a"
              />
            </article>
          </section>

          ${new SearchSection().toString()}
        </main>
        ${new Footer().toString()}
      </div>`
  }
}