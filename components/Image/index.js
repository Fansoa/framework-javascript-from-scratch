import MiniReact from "../../core/MiniReact.js";

class Image extends MiniReact.Component {
  constructor(props) {
    super(props);
    this.src = props.src;
    this.alt = props.alt;
  }

  renderComponent() {
    this.data.content =
      `<img class="w-full h-full object-cover" src="{{ props.src }}" alt="{{ props.alt }}"/>`.interpolate(
        this,
      );

    return this.data;
  }
}

export default Image;
