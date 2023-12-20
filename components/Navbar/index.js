import MiniReact from "../../core/MiniReact.js";
import BrowserLink from "../../src/components/BrowserLink.js";

class Navbar extends MiniReact.Component {
  renderComponent() {
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

    const components = this.getComponentsData({
      browserLink,
    });

    this.data.content = `
    <div class='hidden h-20 sm:flex justify-between items-center px-5 shadow-md'>
      <img src="../../assets/images/navbarlogo.svg">

      ${components.content.browserLink}
    </div>
    `;

    return this.data;
  }
}

export default Navbar;
