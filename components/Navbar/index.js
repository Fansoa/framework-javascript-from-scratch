import MiniReact from "../../core/MiniReact.js";
import BrowserLink from "../../src/components/BrowserLink.js";
import NavbarMobile from "../NavbarMobile/index.js";

class Navbar extends MiniReact.Component {
  renderComponent() {
    const navbarMobile = new NavbarMobile({}).renderComponent();
    const browserLink = new BrowserLink({
      to: "/",
      content: `<div class='group h-full w-fit flex flex-col'>
    <div class='flex px-2 gap-1 flex items-center h-20'>
      <p class='text-indigo-400'>Carte Interactive</p>
      <img src="../../assets/images/icons/map.svg">
    </div>
    <div class='bg-slate-300 group-hover:bg-indigo-300 h-0.5'></div>
  </div>`,
    }).renderComponent();

    const LinkFAQ = new BrowserLink({
      to: "/faq",
      content: `<div class='group w-fit flex flex-col'>
        <div class='flex px-1 gap-1 flex items-center h-20'>
          <p class='text-indigo-400'>FAQ</p>
        </div>
        <div class='bg-slate-300 group-hover:bg-indigo-300 h-0.5'></div>
      </div>`,
    }).renderComponent();

    this.components = this.getComponentsData({
      browserLink,
      LinkFAQ,
      navbarMobile,
    });

    this.data.content = `
    <div>
      <nav class='hidden h-20 sm:flex justify-between items-center px-5 shadow-md'>
        <img src="../../assets/images/navbarlogo.svg">

        <div class='flex gap-5'>
          {{components.content.LinkFAQ}}
          {{components.content.browserLink}}
        </div>
      </nav>
      {{components.content.navbarMobile}}
    </div>
    `.interpolate(this);

    this.data.functions = this.components.functions;
    return this.data;
  }
}

export default Navbar;
