import MiniReact from "../../../../core/MiniReact.js";

export default class InteractiveMapListItem extends MiniReact.Component {
  renderComponent() {
    this.isActive = this.props.selectedSport === this.props.sport.name;

    this.data.content =
      `<div onclick="{{ props.selectSport }}('{{ props.sport.name }}')" class="${
        this.isActive && "active"
      } text-indigo-400 shadow-md my-2 p-2.5 hover:text-indigo-600 cursor-pointer transition-all rounded-sm duration-150 bg-white mapListLink">
      {{ props.sport.name }}
    </div>`.interpolate(this);

    return this.data;
  }
}
