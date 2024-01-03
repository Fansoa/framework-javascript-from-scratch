import MiniReact from "../../../core/MiniReact.js";

class FooterMobile extends MiniReact.Component {
  renderComponent() {
    this.data.content =
      `<footer class="items-center flex max-w-[481px] flex-col pt-8 sm:hidden">
        <img src="../../assets/images/esgi_footer_logo.svg">
      <div
        class="items-stretch self-stretch bg-indigo-400 flex w-full flex-col mt-8 px-12 py-10 max-md:max-w-full px-10"
      >
        <section>
          <h1 class="font-nova-square text-white text-xl leading-5 whitespace-nowrap">
            Informations légales
          </h1>
        </section>
        <section>
          <h1 class="font-nova-square text-white text-xl leading-5 whitespace-nowrap mt-9">
            Contact
          </h1>
          <div class="text-white text-xs font-semibold leading-5 mt-2">
            35 impasse de Karl Marx<br />
            40 800
            <br />
            Aire sur Goulag
            <br />
            nomdusite@gmail.com
          </div>
        </section>
        <section>
          <h1 class="font-nova-square text-white text-xl leading-5 whitespace-nowrap mt-9">
            Retrouvez-nous
          </h1>
          <div class="text-white text-xs font-semibold leading-5 mt-2">
            ESGI - Ecole supérieur du genie ingormatiaueLes fondateurs
          </div>
        </section>
        <div class="text-white text-xs font-semibold leading-5 mt-9">
          © 2023 ESGI - Toute reproduction ou utilisation de l'œuvre est interdite
          sans l'autorisation de l'auteur.
          <br />
        </div>
      </div>
    </footer>`.interpolate(this);

    return this.data;
  }
}

export default FooterMobile;
