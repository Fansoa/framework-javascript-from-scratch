import MiniReact from "../../core/MiniReact.js";

export default class LocationDetailPage extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.state = { slug: null };
  }

  render() {
    if (!this.state.slug) {
      const params = new URLSearchParams(document.location.search);

      this.setState((prev) => ({
        ...prev,
        slug: params.get("place"),
      }));
    }

    this.data.content = this.parseHTML(
      `<main data-component-key="{{ key }}" class="bg-slate-100 grid grid-cols-3 max-h-[600px]">
      {{ state.slug }}
      <span class="bg-red-500">Pouet</span>
    </main>`.interpolate(this),
    );

    return this.createElement(...this.data.content);
  }
}
