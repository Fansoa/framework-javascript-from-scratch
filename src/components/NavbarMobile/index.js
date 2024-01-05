import MiniReact from "../../../core/MiniReact.js";
import BrowserLink from "../BrowserLink.js";

class NavbarMobile extends MiniReact.Component {
  renderComponent() {
    const browserLink = new BrowserLink({
      to: "/",
      content: `<div class='h-full w-fit flex flex-col'>
    <div class='flex px-2 gap-1 flex items-center h-20'>
      <p class='text-indigo-400'>Carte Interactive</p>
      <img src="../../assets/images/icons/map.svg">
    </div>
  </div>`,
    }).renderComponent();

    this.components = this.getComponentsData({
      browserLink,
    });

    this.data.content = `
    <nav class='z-50 shadow-inner fixed bottom-0 bg-white flex h-20 sm:hidden justify-center items-center px-5 w-full'>
      {{components.content.browserLink}}
    </nav>
    `.interpolate(this);

    this.data.functions = this.components.functions;

    return this.data;
  }
}

export default NavbarMobile;
