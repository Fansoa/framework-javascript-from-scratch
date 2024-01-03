import MiniReact from "../../../../core/MiniReact.js";

export default class AccordionListItem extends MiniReact.Component {
  renderComponent() {
    this.data.content = `
      <details class="group py-3">
        <summary class="cursor-pointer flex font-medium items-center justify-between md:mt-0 mx-auto overflow-hidden p-2 text-gray-600 w-full list-none">
          <span class="max-w-[481px]">{{ list.title }}</span>
          <span class="transition group-open:rotate-180">
            <img src="../../../assets/images/icons/arrow_down.svg">
          </span>
        </summary>
        <p class="text-neutral-600 mt-3 group-open:animate-fadeIn">
          {{ list.content }}
        </p>
      </details>
    `.interpolate(this.props);

    return this.data;
  }
}
