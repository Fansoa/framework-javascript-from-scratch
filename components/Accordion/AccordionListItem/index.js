import MiniReact from "../../../../core/MiniReact.js";

export default class AccordionListItem extends MiniReact.Component {
  renderComponent() {
    this.isActive = (this.props.selected === this.props.list.title)? "open" : "";

    this.data.content = `
      <details onclick="{{ selected }}('{{ list.title }}')" class="group py-3" ${ this.isActive }>
        <summary class="cursor-pointer flex font-medium items-center justify-between md:mt-0 mx-auto overflow-hidden p-2 text-gray-600 w-full list-none">
          <span>{{ list.title }}</span>
          <span class="transition group-open:rotate-180">
            <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" data-darkreader-inline-stroke="">
              <path d="M6 9l6 6 6-6"></path>
            </svg>
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
