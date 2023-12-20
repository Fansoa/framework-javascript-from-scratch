import MiniReact from "../../core/MiniReact.js";
import BrowserLink from "../../src/components/BrowserLink.js";

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

    const components = this.getComponentsData({
      browserLink,
    });

    this.data.content = `
    <div class='bg-white flex h-20 sm:hidden justify-center sticky bottom-0 items-center px-5 shadow-md'>
      ${components.content.browserLink}
    </div>
    `;

    return this.data;
  }
}

export default NavbarMobile;
