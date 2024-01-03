import MiniReact from "../../core/MiniReact.js";

class SectionTitle extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.typeCheck(props, this.propTypes);
  }

  propTypes = {
    title: {
      type: "string",
    },
  };

  renderComponent() {
    this.data.content =
      `<h1 class="text-2xl md:text-4xl uppercase text-zinc-800 font-bold">{{ props.title }}</h1>`.interpolate(
        this,
      );

    return this.data;
  }
}

export default SectionTitle;
