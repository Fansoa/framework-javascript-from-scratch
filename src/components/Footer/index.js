import MiniReact from "../../../core/MiniReact.js";
import FooterMobile from "./FooterMobile/index.js";

class Footer extends MiniReact.Component {
  renderComponent() {
    const footerMobile = new FooterMobile({}).renderComponent();

    this.components = this.getComponentsData({
      footerMobile,
    });

    this.data.content = `<div>
      <footer class="flex flex-col justify-center items-stretch hidden sm:block">
        <div class="bg-indigo-400 w-full pr-20 max-md:max-w-full max-md:pr-5">
          <div class="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div
              class="flex w-[26%] max-md:w-full max-md:ml-0 bg-white pt-10 pb-5 pl-7 pr-10 footer_corner_rounded"
            >
              <img src="../../assets/images/esgi_footer_logo.svg">
            </div>
            <div
              class="flex flex-col items-stretch w-[74%] ml-5 max-md:w-full max-md:ml-0 pt-10 pb-5"
            >
              <div
                class="flex flex-col items-stretch my-auto max-md:max-w-full max-md:mt-10"
              >
                <div
                  class="justify-between items-stretch grid grid-cols-3	 gap-5 px-0.5 py-px max-md:max-w-full max-md:flex-wrap max-md:justify-center"
                >
                  <section class="flex flex-col items-stretch">
                    <h1 class="font-nova-square text-white text-xl leading-5">Informations légales</h1>
                  </section>
                  <section class="flex flex-col items-stretch">
                    <h1 class="font-nova-square text-white text-xl leading-5">Contact</h1>
                    <div class="text-white text-xs font-bold leading-5 mt-4">
                      35 impasse de Karl Marx<br />
                      40 800
                      <br />
                      Aire sur Goulag
                      <br />
                      nomdusite@gmail.com
                    </div>
                  </section>
                  <section class="flex flex-col items-stretch self-start">
                    <h1 class="font-nova-square text-white text-xl leading-5 whitespace-nowrap">
                      Retrouvez-nous
                    </h1>
                    <div class="text-white text-xs font-bold leading-5 mt-4">
                      ESGI - Ecole supérieur du genie ingormatiaueLes fondateurs
                    </div>
                  </section>
                </div>
                <div
                  class="text-white text-xs font-bold leading-5 mt-10 max-md:max-w-full"
                >
                  © 2023 ESGI - Toute reproduction ou utilisation de l'œuvre est
                  interdite sans l'autorisation de l'auteur.
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {{components.content.footerMobile}}
      </div>`.interpolate(this);

    return this.data;
  }
}

export default Footer;
